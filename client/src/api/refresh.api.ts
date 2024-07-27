import { JsonResponse } from 'src/interfaces/api';
import { JWT } from '../interfaces';
import { apiCall, handleError } from './';
import { JwtStorage } from 'src/utils/JwtStorage';

async function refreshToken(): Promise<JWT | void> {
  try {
    const responseData: JsonResponse = await apiCall({
      method: 'POST',
      controller: 'refresh',
      action: '',
      body: null,
      options: { credentials: 'include' },
    });

    const jwt: JWT = responseData.jwt;

    if (!jwt) {
      throw new Error('JWT data is missing.');
    }

    // if (setUserData) {
    //   setUserData(userData);
    // }

    JwtStorage.setAccessToken(jwt);

    return jwt;
  }
  catch (err: unknown) {
    // if (setUserData) {
    //   setUserData(null);
    // }

    localStorage.removeItem('token');

    handleError(err);
  }
}

export {
  refreshToken,
};
