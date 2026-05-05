import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ReactQueryKeys } from '../keys';
import { MailRequest, MailResponse } from '@/interfaces/mail.interface';
import { ApiError } from '@/handler/error';
import { useApi } from '../fetch-api';

const sendMail = async (data: MailRequest): Promise<MailResponse> => {
  const response = await useApi.post('/mail', data);

  return response;
};

export const useSendMail = () => {
  return useMutation<MailResponse, ApiError, MailRequest>({
    mutationKey: [ReactQueryKeys.SEND_MESSAGE],
    mutationFn: sendMail,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error('Error sending message');
      console.error(error);
    },
  });
};
