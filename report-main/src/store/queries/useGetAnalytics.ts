'use client';
import { apiRoutes } from '@/lib/apiRoutes';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../fetch-api';
import { ReactQueryKeys } from '../keys';

type Totals = {
  last_6_hours: number;
  last_24_hours: number;
  last_7_days: number;
  last_30_days: number;
  custom_range: null | number;
};

type TopItem = {
  country?: string | null;
  region?: string | null;
  browser?: string | null;
  os?: string | null;
  device?: string | null;
  url?: string | null;
  referrer?: string | null;
  visits: number;
};

type UniqueVisitorDetail = {
  ip: string;
  country: string | null;
  browser: string;
  os: string;
  device: string;
  lastSeen: string;
};

export type AnalyticsResponse = {
  status: boolean;
  data: {
    totals: Totals;
    top_countries: TopItem[];
    top_region: TopItem[];
    top_browsers: TopItem[];
    top_os: TopItem[];
    top_devices: TopItem[];
    top_pages: TopItem[];
    top_referrers: TopItem[];
    unique_visitors: number;
    unique_visitor_details: UniqueVisitorDetail[];
    return_rate: number;
  };
};

const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const url = apiRoutes.analytics();
  const response = await useApi.get(url);
  return response;
};

export default function useGetAnalytics() {
  return useQuery({
    queryKey: [ReactQueryKeys.ANALYTICS],
    queryFn: () => getAnalytics(),
  });
}
