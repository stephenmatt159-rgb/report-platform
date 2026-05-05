import { config } from '@/constants/config';
import { isProduction } from '@/lib/check-env';

function getBaseURL() {
  return isProduction() ? config.API_URL : config.LOCAL_HOST_API_URL;
}

function getMailURL() {
  return config.API_URL;
}
export { getBaseURL, getMailURL };
