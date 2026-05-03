'use client';
import { apiRoutes } from '@/lib/apiRoutes';
import { useQuery } from '@tanstack/react-query';
import { PeopleResponse } from '@/interfaces/people.interface';
import { useApi } from '../fetch-api';
import { ReactQueryKeys } from '../keys';

const getPeople = async (
  search?: string,
  page?: number
): Promise<PeopleResponse> => {
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (page) params.append('page', page.toString());

  const queryString = params.toString().replace(/\+/g, '%20');
  const url = `${apiRoutes.people()}${queryString && `?${queryString}`}`;

  const response = await useApi.get(url);

  return response;
};

export default function useGetPeople(search?: string, page?: number) {
  return useQuery({
    queryKey: [ReactQueryKeys.PEOPLE, search, page],
    queryFn: () => getPeople(search, page),
  });
}
