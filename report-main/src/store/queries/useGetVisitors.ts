'use client';
import { apiRoutes } from '@/lib/apiRoutes';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../fetch-api';
import { ReactQueryKeys } from '../keys';

export type Visitor = {
  id: string;
  ip: string;
  continent: string | null;
  country: string | null;
  countryCode: string | null;
  region: string | null;
  district: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  userAgent: string;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: string;
  platform: string;
  vendor: string;
  language: string;
  languages: string[];
  timezone: string;
  networkType: string;
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  hardware: {
    memoryGB: number;
    cpuCores: number;
  };
  page: {
    url: string;
    path: string;
    referrer: string;
  };
  clientTimestamp: string | null;
  serverTimestamp: string;
};

type VisitorsResponse = {
  status: boolean;
  data: Visitor[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};

const getVisitors = async (
  search?: string,
  page?: number,
): Promise<VisitorsResponse> => {
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (page) params.append('page', page.toString());

  const queryString = params.toString().replace(/\+/g, '%20');
  const url = `${apiRoutes.visitors()}${queryString && `?${queryString}`}`;

  const response = await useApi.get(url);

  return response;
};

export default function useGetVisitors(search?: string, page?: number) {
  return useQuery({
    queryKey: [ReactQueryKeys.ANALYTICS, search, page],
    queryFn: () => getVisitors(search, page),
  });
}
