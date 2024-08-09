import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { JWT } from '../interfaces';
import { refreshToken } from '../api';
import { canUseAuthorizationHeader } from '../utils/auth.util';

const useAxiosInterceptors = (jwt: JWT | null) => {
  if (!jwt) return;

  axios.interceptors.request.use((config) => {
    if (canUseAuthorizationHeader(jwt, config)) {
      config.headers.Authorization = `Bearer ${jwt?.token}`;
    }

    return config;
  }, undefined, { synchronous: true });

  axios.interceptors.response.use((response) => response, async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    let isRefreshing = false;

    const canRefreshToken = (
      url: string, 
      status: number, 
      isRefreshing: boolean,
    ): boolean => {
      if (status !== 401) return false;
      if (url.endsWith('/api/refresh/')) return false;
      if (isRefreshing) return false;
      return true;
    };

    if (canRefreshToken(originalRequest.url as string, error.response.status, isRefreshing)) {
      const accessToken: JWT = await refreshToken() as JWT;
      const headers = originalRequest.headers as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${accessToken.token}`;
      isRefreshing = true;
      return axios.request(originalRequest);
    }

    return Promise.reject(error);
  });
};

export { useAxiosInterceptors };
