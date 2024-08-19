import { AxiosRequestConfig } from 'axios';
import { JWT } from '@shared';

export const canUseAuthorizationHeader = (
  jwt: JWT,
  config: AxiosRequestConfig,
): boolean => {
  if (!jwt.token) return false;
  if (config.url?.endsWith('/api/refresh/')) return false;
  if (config.headers?.Authorization) return false;
  return true;
};

export const canRefreshToken = (
  url: string, 
  status: number, 
  isRefreshing: boolean,
): boolean => {
  if (status !== 401) return false;
  if (url.endsWith('/api/refresh/')) return false;
  if (isRefreshing) return false;
  return true;
};
