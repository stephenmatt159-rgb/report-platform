import dotenv from 'dotenv';
import { requireEnv } from '../helpers/require-env';

dotenv.config();

export const config = {
  GEO_IP_API: requireEnv('GEO_IP_API'),
};
