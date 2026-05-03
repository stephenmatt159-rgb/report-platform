export interface MailRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface MailResponse {
  status: boolean;
  message: string;
}
