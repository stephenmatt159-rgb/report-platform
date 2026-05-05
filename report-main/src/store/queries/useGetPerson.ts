'use client';
import { apiRoutes } from '@/lib/apiRoutes';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../fetch-api';
import { ReactQueryKeys } from '../keys';
import { PersonResponse } from '@/interfaces/people.interface';

const getPerson = async (id: string): Promise<PersonResponse> => {
  const url = `${apiRoutes.peopleId(id)}`;

  const response = await useApi.get(url);

  return response;
};

export default function useGetPerson(id: string) {
  return useQuery({
    queryKey: [ReactQueryKeys.PERSON, id],
    queryFn: () => getPerson(id),
  });
}
