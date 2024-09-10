import { JWT } from '@shared';
import { store, setJwt } from '@redux';
import {
  httpRequestParams,
  RefreshTokenResponse,
  refreshTokenResponse,
} from '@schemas';
import { apiCall } from '.';

export const refreshToken = async (): Promise<JWT | void> => {
  const params = {
    method: 'POST',
    controller: 'refresh',
    action: '',
    options: { withCredentials: true },
  };

  httpRequestParams.parse(params);

  const response = (await apiCall(
    params,
    false,
    'rest',
  )) as RefreshTokenResponse;

  refreshTokenResponse.parse(response);

  store.dispatch(setJwt(response.jwt));

  return response.jwt;
};
