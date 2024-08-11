import { JWT } from '@shared/types';
import { store, setJwt } from '../redux';
import { apiCall } from '.';

export const refreshToken = async (): Promise<JWT | void> => {
  const response = await apiCall({
    method: 'POST',
    controller: 'refresh',
    action: '',
    options: { withCredentials: true },
  }, false, 'rest');

  if (!response) return;

  if (!response.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(response.jwt));

  return response.jwt;
};
