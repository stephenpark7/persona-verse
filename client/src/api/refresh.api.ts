import { JWT } from '../interfaces';
import { setJwt, store } from '../stores';
import { apiCall } from '.';

async function refreshToken(): Promise<JWT | void> {
  const data = await apiCall({
    method: 'POST',
    controller: 'refresh',
    action: '',
    options: { withCredentials: true },
  }, false);

  if (!data) return;

  if (!data.jwt) {
    throw new Error('JWT data is missing.');
  }

  store.dispatch(setJwt(data.jwt));

  return data.jwt;

  // try {
  // TODO: reimplement error handling
  // }
  // catch (err: AxiosError | unknown) {
  //   store.dispatch(clearJwt());
  // }
}

export {
  refreshToken,
};
