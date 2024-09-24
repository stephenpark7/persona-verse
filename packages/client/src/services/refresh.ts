import { store, setJwt } from '@redux';
import {
  httpRequestParams,
  JsonResponse,
  RefreshTokenResponse,
  refreshTokenResponse,
} from '@schemas';
import { apiCall } from '.';

export const refreshJwt = async (): Promise<JsonResponse> => {
  const params = {
    method: 'POST',
    controller: 'refresh',
    action: () => refreshJwt(),
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
