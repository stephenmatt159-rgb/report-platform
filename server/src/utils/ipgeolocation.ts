import { config } from '../config/ip';

export const lookupIpLocation = async (ip: string) => {
  const apiKey = config.GEO_IP_API;

  if (!apiKey) {
    throw new Error('IPGEOLOCATION_API_KEY is missing');
  }

  const url = `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${apiKey}&ip=${ip}`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Node.js)',
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`IPGeolocation failed: ${res.status}`);
  }

  return res.json();
};
