import { AxiosRequestConfig } from 'axios';
import { jwtSchema, type Jwt } from '@schemas';

export const canUseAuthorizationHeader = (
  jwt: Jwt,
  config: AxiosRequestConfig,
): boolean => {
  jwtSchema.parse(jwt);

  if (config.url?.endsWith('/api/refresh/') || config.headers?.Authorization) {
    return false;
  }

  return true;
};

export const canRefreshToken = (
  url: string,
  status: number,
  isRefreshing: boolean,
): boolean => {
  if (status !== 401 || url.endsWith('/api/refresh/') || isRefreshing) {
    return false;
  }

  return true;
};
