import { store, setJwt } from '@redux';
import {
  httpRequestParams,
  JsonResponse,
  RefreshTokenResponse,
  refreshTokenResponse,
} from '@schemas';
import { apiCall } from '.';
import { refreshJwt as refreshJwtTRPC } from '../trpc';

export const refreshJwt = async (): Promise<JsonResponse> => {
  const params = {
    method: 'POST',
    controller: 'refresh',
    action: () => refreshJwtTRPC(),
    options: { withCredentials: true },
  };

  httpRequestParams.parse(params);

  const response = (await apiCall({
    params,
    showToast: false,
    protocol: 'trpc',
  })) as RefreshTokenResponse;

  refreshTokenResponse.parse(response);

  store.dispatch(setJwt(response.jwt));

  return { message: 'Token successfully refreshed.', jwt: response.jwt };
};
