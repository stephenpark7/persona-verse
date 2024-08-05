import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { JWT } from '../interfaces';
import { refreshToken } from '../api';

const useAxiosInterceptors = (jwt: JWT | null) => {
  if (!jwt) return;

  axios.interceptors.request.use((config) => {
    function canUseAuthorizationHeader(jwt: JWT | null, config: AxiosRequestConfig): boolean {
      if (!jwt) return false;
      if (config.url?.endsWith('/api/refresh/')) return false;
      if (config.headers?.Authorization) return false;
      return true;
    }

    if (canUseAuthorizationHeader(jwt, config)) {
      config.headers.Authorization = `Bearer ${jwt?.token}`;
    }

    return config;
  }, undefined, { synchronous: true });

  axios.interceptors.response.use((response) => response, async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    const { url } = originalRequest;
    const { status } = error.response;
    let isRefreshing = false;

    function canRefreshToken(url: string, status: number, isRefreshing: boolean): boolean {
      if (status !== 401) return false;
      if (url.endsWith('/api/refresh/')) return false;
      if (isRefreshing) return false;
      return true;
    }

    if (canRefreshToken(url as string, status, isRefreshing)) {
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
