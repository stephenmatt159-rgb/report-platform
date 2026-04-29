import * as maxmind from 'maxmind';
import type { CityResponse } from 'maxmind';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/GeoLite2-City.mmdb');

let cityLookup: maxmind.Reader<CityResponse>;

export const initGeoIP = async () => {
  cityLookup = await maxmind.open<CityResponse>(dbPath);
};

export const lookupIpLocation = (ip: string) => {
  if (!cityLookup) return null;
  return cityLookup.get(ip);
};
