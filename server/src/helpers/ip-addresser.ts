import { Request } from 'express';
import crypto from 'crypto';

// 🌍 Get IP (proxy-safe)
export const getClientIp = (req: Request): string => {
  const xff = req.headers['x-forwarded-for'];
  let ip =
    typeof xff === 'string'
      ? xff.split(',')[0].trim()
      : (req.socket.remoteAddress ?? '');

  if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
  return ip || '0.0.0.0';
};

// IP hashing helper
export const hashIp = (ip: string): string =>
  crypto.createHash('sha256').update(ip).digest('hex');
