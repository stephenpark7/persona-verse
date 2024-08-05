import { JWT } from '../../interfaces';
import { setJwt } from '../../redux/slices/actions';
import { store } from '../../redux/stores';
import { apiCall } from '..';

async function refreshToken(): Promise<JWT | void> {
  const response = await apiCall({
    method: 'POST',
    controller: 'refresh',
    action: '',
    options: { withCredentials: true },
  }, false);

  if (!response) return;

  if (!response.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(response.jwt));

  return response.jwt;
}

export {
  refreshToken,
};
