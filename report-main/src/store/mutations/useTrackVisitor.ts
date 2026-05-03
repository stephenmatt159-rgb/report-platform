// server-store/mutations/useTrackVisitor.ts
import { useMutation } from '@tanstack/react-query';
import { useApi } from '../fetch-api';
import { ReactQueryKeys } from '../keys';
import {
  TrackVisitorRequest,
  TrackVisitorResponse,
} from '@/interfaces/tracking.interface';

const trackVisitor = async (
  data: TrackVisitorRequest
): Promise<TrackVisitorResponse> => {
  return useApi.post('/track', data);
};

export const useTrackVisitor = () => {
  return useMutation<TrackVisitorResponse, Error, TrackVisitorRequest>({
    mutationKey: [ReactQueryKeys.TRACK_VISITOR],
    mutationFn: trackVisitor,
    retry: false,
  });
};
