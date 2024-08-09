import { AxiosRequestConfig } from 'axios';
import { JWT } from '../interfaces';

export const canUseAuthorizationHeader = (jwt: JWT | null, config: AxiosRequestConfig): boolean => {
  if (!jwt) return false;
  if (config.url?.endsWith('/api/refresh/')) return false;
  if (config.headers?.Authorization) return false;
  return true;
};
