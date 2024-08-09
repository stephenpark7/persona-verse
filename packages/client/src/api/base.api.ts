import { JsonResponse, ApiCall, ApiProtocol } from '../interfaces';
import { refreshToken } from './refresh.api';
import { getTweets, postTweet } from './tweets.api';
import { register, login, logout } from './users.api';
import { BASE_API_URL } from '../utils';
import { loginUser, LoginUserParams, logoutUser, registerUser, RegisterUserParams } from '../trpc';

import { displayErrorMessage, displaySuccessMessage } from '../utils/messages';
import { sendHttpRequest } from './rest.api';

export const apiCall = async (
  params: ApiCall,
  showToast: boolean,
  protocol: ApiProtocol,
): Promise<JsonResponse | void> => {
  try {
    let response;

    if (protocol === 'trpc') {
      if (params.action === 'register') {
        response = await registerUser(params.body as RegisterUserParams);
      }
      else if (params.action === 'login') {
        response = await loginUser(params.body as LoginUserParams);
      }
      else if (params.action === 'logout') {
        response = await logoutUser();
      }
      else {
        throw new Error('Invalid API action.');
      }
    }
    else if (protocol === 'rest') {
      response = await sendHttpRequest(params);
    }
    else {
      throw new Error('Invalid API protocol.');
    }

    if (showToast) {
      displaySuccessMessage(response.message);
    }
    
    return response as JsonResponse;
  }
  catch (err) {
    displayErrorMessage(err);
    return;
  }
};

export {
  BASE_API_URL,
  login,
  register,
  logout,
  getTweets,
  postTweet,
  refreshToken,
};
