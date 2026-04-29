import { Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';
import { MailerService } from '../services/smtp.service';
import { site } from '../config/site';
import { lookupIpLocation } from '../utils/ipgeolocation';
import { ParsedQs } from 'qs';
import { getClientIp, hashIp } from '../helpers/ip-addresser';
import { AppDataSource } from '../config/database';
import { Visitor } from '../entity/Visitor';
import { getPagination } from '../helpers/paginate';
import { Like } from 'typeorm';

// Frontend payload interface
interface VisitorPayload {
  hardware?: any;
  language?: string;
  languages?: string[];
  network?: { type?: string };
  page: { path: string; url: string; referrer?: string };
  platform?: string;
  screen?: { width: number; height: number; pixelRatio: number };
  timestamp?: string;
  timezone?: string;
  userAgent?: string;
  vendor?: string;
}

export const trackVisitor = async (
  req: Request<{}, {}, VisitorPayload, ParsedQs>,
  res: Response,
): Promise<void> => {
  try {
    const mailer = new MailerService();
    const visitorRepo = AppDataSource.getRepository(Visitor);

    const ipRaw = getClientIp(req);
    // const ip = hashIp(ipRaw);

    // 🧠 Parse user agent
    const ua = new UAParser(req.headers['user-agent'] ?? '').getResult();

    let geo: any = null;
    try {
      geo = await lookupIpLocation(ipRaw);
    } catch (err) {
      console.warn('IP geolocation failed:', err);
    }

    const location = geo
      ? {
          continent: geo?.location?.continent_name ?? 'Unknown',
          country: geo?.location?.country_name ?? 'Unknown',
          countryCode: geo?.location?.country_code2 ?? 'Unknown',
          region: geo?.location?.state_prov ?? 'Unknown',
          district: geo?.location?.district ?? 'Unknown',
          city: geo?.location?.city ?? 'Unknown',
          latitude: geo?.location?.latitude,
          longitude: geo?.location?.longitude,
        }
      : null;

    const {
      hardware,
      language,
      languages,
      network,
      page,
      platform,
      screen,
      timestamp,
      timezone,
      userAgent,
      vendor,
    } = req.body;

    const visitorData = {
      ip: ipRaw,
      page,
      screen,
      hardware,
      timezone,
      clientTimestamp: timestamp,
      ...location,
      userAgent,
      platform,
      browser: ua.browser.name ?? 'unknown',
      browserVersion: ua.browser.version ?? 'unknown',
      os: ua.os.name ?? 'unknown',
      osVersion: ua.os.version ?? 'unknown',
      deviceType: ua.device.type ?? 'unknown',
      vendor,
      language,
      languages,
      networkType: network?.type,
    };

    // 🔹 SAVE VISITOR (NON-BLOCKING, SAFE)
    visitorRepo
      .save(visitorData)
      .then((v) => {
        console.log('✅ Visitor saved:', v.id);
      })
      .catch((err) => {
        console.warn('⚠️ Visitor save failed (ignored):', err.message);
      });

    const hasValidLocation =
      !!location && !!location.latitude && !!location.longitude;

    // 🔹 SEND EMAIL (PRIMARY FLOW)
    await mailer.send({
      to: 'reportplaform777@gmail.com',
      subject: '👀 New Visitor on Your Site',
      templateName: 'visitor-tracking',
      templateData: {
        pagePath: page.path,
        pageUrl: page.url,
        referrer: page.referrer ?? 'unknown',
        serverTimestamp: timestamp ?? 'unknown',

        deviceType: visitorData.deviceType,
        platform: visitorData.platform ?? 'unknown',
        os: visitorData.os,
        osVersion: visitorData.osVersion,
        browser: visitorData.browser,
        browserVersion: visitorData.browserVersion,
        network: network?.type ?? '',

        screenWidth: screen?.width ?? 'unknown',
        screenHeight: screen?.height ?? 'unknown',
        pixelRatio: screen?.pixelRatio ?? 'unknown',

        timezone: visitorData.timezone ?? 'unknown',
        languages: visitorData.languages?.join(', ') ?? 'unknown',
        ip: ipRaw,

        continent: location?.continent ?? 'unknown',
        country: location?.country ?? 'Unknown',
        countryCode: location?.countryCode ?? 'Unknown',
        region: location?.region ?? 'Unknown',
        district: location?.district ?? 'Unknown',
        city: location?.city ?? 'Unknown',
        latitude: location?.latitude ?? 'Unknown',
        longitude: location?.longitude ?? 'Unknown',

        mapsLink:
          location?.latitude && location?.longitude
            ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
            : 'Not available',

        hasValidLocation: hasValidLocation ? 1 : 0,
        siteName: site.SITE_LINK,
      },
    });

    res.status(200).json({ status: true, message: 'successful' });
  } catch (error) {
    console.error('❌ Error tracking visitor:', error);
    res.status(500).json({ ok: false });
  }
};

export const getAllVisitors = async (req: Request, res: Response) => {
  try {
    const { skip, page, perPage } = getPagination(req.query);

    const search = (req.query.search as string)?.trim();
    const continent = (req.query.continent as string)?.trim();
    const country = (req.query.country as string)?.trim();
    const region = (req.query.region as string)?.trim();
    const ip = (req.query.ip as string)?.trim();
    const deviceType = (req.query.device_type as string)?.trim();
    const os = (req.query.os as string)?.trim();

    const startDate = req.query.start_date as string;
    const endDate = req.query.end_date as string;

    const visitorRepo = AppDataSource.getRepository(Visitor);

    const qb = visitorRepo.createQueryBuilder('visitor');

    // SEARCH (grouped OR)
    if (search) {
      qb.andWhere(
        `(visitor.country LIKE :search
        OR visitor.continent LIKE :search
        OR visitor.region LIKE :search
        OR visitor.city LIKE :search
        OR visitor.ip LIKE :search
        OR visitor.browser LIKE :search
        OR visitor.os LIKE :search
        OR visitor.deviceType LIKE :search)`,
        { search: `%${search}%` },
      );
    }

    // FILTERS (AND)
    if (continent)
      qb.andWhere('visitor.continent LIKE :continent', {
        continent: `%${continent}%`,
      });

    if (country)
      qb.andWhere('visitor.country LIKE :country', {
        country: `%${country}%`,
      });

    if (region)
      qb.andWhere('visitor.region LIKE :region', {
        region: `%${region}%`,
      });

    if (deviceType)
      qb.andWhere('visitor.deviceType LIKE :deviceType', {
        deviceType: `%${deviceType}%`,
      });

    if (os) qb.andWhere('visitor.os LIKE :os', { os: `%${os}%` });

    if (ip) qb.andWhere('visitor.ip LIKE :ip', { ip: `%${ip}%` });

    // DATE FILTER
    if (startDate && endDate) {
      qb.andWhere('visitor.serverTimestamp BETWEEN :startDate AND :endDate', {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    } else if (startDate) {
      qb.andWhere('visitor.serverTimestamp >= :startDate', {
        startDate: new Date(startDate),
      });
    } else if (endDate) {
      qb.andWhere('visitor.serverTimestamp <= :endDate', {
        endDate: new Date(endDate),
      });
    }

    const [data, total] = await qb
      .orderBy('visitor.serverTimestamp', 'DESC')
      .skip(skip)
      .take(perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(total / perPage);

    res.status(200).json({
      status: true,
      data,
      pagination: {
        total,
        per_page: perPage,
        current_page: page,
        last_page: totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching paginated visitors:', error);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

function getDomain(ref: string): string {
  try {
    const url = new URL(ref);
    return url.hostname.replace(/^www\./, '');
  } catch {
    // If URL parsing fails, return the raw string
    return ref;
  }
}

export const getVisitorAnalytics = async (req: Request, res: Response) => {
  try {
    const visitorRepo = AppDataSource.getRepository(Visitor);

    const startDate = req.query.start_date
      ? new Date(req.query.start_date as string)
      : null;

    const endDate = req.query.end_date
      ? new Date(req.query.end_date as string)
      : null;

    // ---- TOTAL VISITS ----
    const totalLast6Hours = await visitorRepo
      .createQueryBuilder('visitor')
      .where('visitor.serverTimestamp >= NOW() - INTERVAL 6 HOUR')
      .getCount();

    const totalLast24Hours = await visitorRepo
      .createQueryBuilder('visitor')
      .where('visitor.serverTimestamp >= NOW() - INTERVAL 24 HOUR')
      .getCount();

    const totalLast7Days = await visitorRepo
      .createQueryBuilder('visitor')
      .where('visitor.serverTimestamp >= NOW() - INTERVAL 7 DAY')
      .getCount();

    const totalLast30Days = await visitorRepo
      .createQueryBuilder('visitor')
      .where('visitor.serverTimestamp >= NOW() - INTERVAL 30 DAY')
      .getCount();

    // ---- CUSTOM DATE RANGE ----
    let totalCustom = null;
    if (startDate && endDate) {
      totalCustom = await visitorRepo
        .createQueryBuilder('visitor')
        .where('visitor.serverTimestamp BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        })
        .getCount();
    }

    // ---- TOP 5 LISTS ----
    const topCountries = await visitorRepo
      .createQueryBuilder('visitor')
      .select('visitor.country', 'country')
      .addSelect('COUNT(visitor.id)', 'visits')
      .groupBy('visitor.country')
      .orderBy('visits', 'DESC')
      .limit(5)
      .getRawMany();

    const topRegion = await visitorRepo
      .createQueryBuilder('visitor')
      .select('visitor.region', 'region')
      .addSelect('COUNT(visitor.id)', 'visits')
      .groupBy('visitor.region')
      .orderBy('visits', 'DESC')
      .limit(5)
      .getRawMany();

    const topBrowsers = await visitorRepo
      .createQueryBuilder('visitor')
      .select('visitor.browser', 'browser')
      .addSelect('COUNT(visitor.id)', 'visits')
      .groupBy('visitor.browser')
      .orderBy('visits', 'DESC')
      .limit(5)
      .getRawMany();

    const topOs = await visitorRepo
      .createQueryBuilder('visitor')
      .select('visitor.os', 'os')
      .addSelect('COUNT(visitor.id)', 'visits')
      .groupBy('visitor.os')
      .orderBy('visits', 'DESC')
      .limit(5)
      .getRawMany();

    const topDevices = await visitorRepo
      .createQueryBuilder('visitor')
      .select('visitor.deviceType', 'device')
      .addSelect('COUNT(visitor.id)', 'visits')
      .groupBy('visitor.deviceType')
      .orderBy('visits', 'DESC')
      .limit(5)
      .getRawMany();

    const topPages = await visitorRepo
      .createQueryBuilder('visitor')
      .select("JSON_UNQUOTE(JSON_EXTRACT(visitor.page, '$.url'))", 'url')
      .addSelect('COUNT(visitor.id)', 'visits')
      .where("JSON_EXTRACT(visitor.page, '$.url') IS NOT NULL")
      .groupBy("JSON_UNQUOTE(JSON_EXTRACT(visitor.page, '$.url'))")
      .orderBy('visits', 'DESC')
      .limit(5)
      .getRawMany();

    // ---- TOP REFERRERS (DOMAIN GROUPING, WITHOUT DROPPING) ----
    const rawReferrers = await visitorRepo
      .createQueryBuilder('visitor')
      .select(
        "JSON_UNQUOTE(JSON_EXTRACT(visitor.page, '$.referrer'))",
        'referrer',
      )
      .where("JSON_EXTRACT(visitor.page, '$.referrer') IS NOT NULL")
      .getRawMany();

    const refCounts: Record<string, number> = {};

    rawReferrers.forEach((r) => {
      const ref = r.referrer;
      const domain = getDomain(ref);
      refCounts[domain] = (refCounts[domain] || 0) + 1;
    });

    const topReferrers = Object.entries(refCounts)
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);

    // ---- UNIQUE VISITORS ----
    const uniqueVisitors = await visitorRepo
      .createQueryBuilder('visitor')
      .select('COUNT(DISTINCT visitor.ip)', 'uniqueVisitors')
      .getRawOne();

    // ---- UNIQUE VISITORS (WITH DETAILS) ----
    const uniqueVisitorDetails = await visitorRepo
      .createQueryBuilder('visitor')
      .select('visitor.ip', 'ip')
      .addSelect('visitor.country', 'country')
      .addSelect('visitor.deviceType', 'device')
      .addSelect('visitor.os', 'os')
      .addSelect('visitor.browser', 'browser')
      .addSelect('MAX(visitor.serverTimestamp)', 'lastSeen')
      .groupBy('visitor.ip')
      .orderBy('lastSeen', 'DESC')
      .limit(20) // change this as needed
      .getRawMany();

    // ---- RETURN RATE ----
    const repeatVisitors = await visitorRepo
      .createQueryBuilder('visitor')
      .select('COUNT(visitor.ip)', 'totalVisits')
      .addSelect('COUNT(DISTINCT visitor.ip)', 'uniqueIPs')
      .getRawOne();

    const returnRate =
      repeatVisitors && repeatVisitors.totalVisits
        ? ((repeatVisitors.totalVisits - repeatVisitors.uniqueIPs) /
            repeatVisitors.totalVisits) *
          100
        : 0;

    res.status(200).json({
      status: true,
      data: {
        totals: {
          last_6_hours: totalLast6Hours,
          last_24_hours: totalLast24Hours,
          last_7_days: totalLast7Days,
          last_30_days: totalLast30Days,
          custom_range: totalCustom,
        },
        top_countries: topCountries.map((c) => ({
          country: c.country,
          visits: Number(c.visits),
        })),
        top_region: topRegion.map((c) => ({
          region: c.region,
          visits: Number(c.visits),
        })),
        top_browsers: topBrowsers.map((b) => ({
          browser: b.browser,
          visits: Number(b.visits),
        })),
        top_os: topOs.map((o) => ({
          os: o.os,
          visits: Number(o.visits),
        })),
        top_devices: topDevices.map((d) => ({
          device: d.device,
          visits: Number(d.visits),
        })),
        top_pages: topPages.map((p) => ({
          url: p.url,
          visits: Number(p.visits),
        })),
        top_referrers: topReferrers,
        unique_visitors: Number(uniqueVisitors.uniqueVisitors),
        unique_visitor_details: uniqueVisitorDetails,
        return_rate: returnRate,
      },
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};
