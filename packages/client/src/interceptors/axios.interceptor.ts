import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { JWT } from '../interfaces';
import { refreshToken } from '../api';
import { canRefreshToken, canUseAuthorizationHeader } from '../utils/auth.util';

let isRefreshing = false;

const useAxiosInterceptors = (jwt: JWT) => {
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

    const url = originalRequest.url;

    if (!url) {
      return Promise.reject(error);
    }

    if (canRefreshToken(url, error.response.status, isRefreshing)) {
      const accessToken: JWT = await refreshToken() as JWT;
      isRefreshing = true;
      if (!accessToken) {
        return Promise.reject(error);
      }
      const headers = originalRequest.headers as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${accessToken.token}`;
      return axios.request(originalRequest);
    }

    return Promise.reject(error);
  });
};

export { useAxiosInterceptors };
