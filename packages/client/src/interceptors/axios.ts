import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { JWT } from '@shared';
import { refreshToken } from '@services';
import { canRefreshToken, canUseAuthorizationHeader } from '@utils';
import { tokenStorage } from '@utils';
import { clearJwt, store } from '@redux';

let isRefreshing = false;

export const useAxiosInterceptors = (jwt: JWT) => {
  let isFetching = false;

  window.fetch = async (...args) => {
    const [url, options] = args as [string, RequestInit];

    const config = {
      url,
      method: options.method,
      headers: options.headers,
      data: options.body,
    } as AxiosRequestConfig;

    if (isFetching) return;

    if (canUseAuthorizationHeader(jwt, config)) {
      console.log(url, options);
      isFetching = true;
      return await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${jwt?.token}`,
        },
      });
    } else {
      isFetching = true;
      return await fetch(url, options);
    }
  };

  axios.interceptors.request.use(
    (config) => {
      if (canUseAuthorizationHeader(jwt, config)) {
        config.headers.Authorization = `Bearer ${jwt?.token}`;
      }

      return config;
    },
    undefined,
    { synchronous: true },
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      const url = originalRequest.url;

      if (!url) {
        return Promise.reject(error);
      }

      if (canRefreshToken(url, error.response.status, isRefreshing)) {
        const accessToken: JWT = (await refreshToken()) as JWT;
        isRefreshing = true;
        if (!accessToken) {
          store.dispatch(clearJwt());
          tokenStorage.clearAccessToken();
          return Promise.reject(error);
        }
        const headers = originalRequest.headers as AxiosRequestHeaders;
        headers.Authorization = `Bearer ${accessToken.token}`;
        return axios.request(originalRequest);
      }

      setTimeout(() => (window.location.href = '/login'), 1500);
      return Promise.reject(error);
    },
  );
};
