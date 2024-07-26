import {
  SetUserData,
  JWT,
} from '../interfaces';
import { apiCall, handleError } from './index';

async function refreshToken(
  setUserData?: SetUserData,
): Promise<JWT | void> {
  try {
    const responseData = await apiCall('POST', 'refresh', '', null, { credentials: 'include' });

    const userData = responseData.accessToken;

    if (!userData) {
      throw new Error('User data is missing.');
    }

    if (setUserData) {
      setUserData(userData);
    }

    localStorage.setItem('token', JSON.stringify(userData));

    return userData;
  }
  catch (err: unknown) {
    if (setUserData) {
      setUserData(null);
    }

    localStorage.removeItem('token');

    handleError(err);
  }
}

export {
  refreshToken,
};
