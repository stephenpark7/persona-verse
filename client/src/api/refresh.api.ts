import { JWT } from '../interfaces';
import { JsonResponse } from '../../src/interfaces/api';
import { clearJwt, setJwt, store } from '../../src/stores';
import { apiCall, handleError } from './';

async function refreshToken(): Promise<JWT | void> {
  try {
    const responseData: JsonResponse = await apiCall({
      method: 'POST',
      controller: 'refresh',
      action: '',
      options: { withCredentials: true },
    });

    const { jwt } = responseData;
    
    if (!jwt) {
      throw new Error('JWT data is missing.');
    }

    store.dispatch(setJwt(jwt));
    return jwt;
  }
  catch (err: unknown) {
    store.dispatch(clearJwt());

    handleError(err);
  }
}

export {
  refreshToken,
};
