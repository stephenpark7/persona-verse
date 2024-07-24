import { toast } from 'react-toastify';
import * as fetchIntercept from 'fetch-intercept';
import { refreshToken } from './refresh';

const useFetchIntercept = (): void => {
  fetchIntercept.register({
    request: function (url, config) {
      config.headers = config.headers || {};
      return [ url, config ];
    },
    requestError: function (error) {
      return Promise.reject(error);
    },
    response: async function (response): Promise<fetchIntercept.FetchInterceptorResponse> {
      if (response.status !== 401 || response.url.endsWith('/login')) {
        return response;
      }
      try {
        const responseData = await refreshToken();

        if (!responseData) {
          throw new Error('Error refreshing token.');
        }

        response.headers.set('Authorization', `Bearer ${responseData.token}`);
        return response;
      } catch (error) {
        toast.error('Session expired. Please log in again.');
        return response;
      }
    },
    responseError: function (error) {
      return Promise.reject(error);
    },
  })
};

export default useFetchIntercept;

