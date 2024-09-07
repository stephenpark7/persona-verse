import { JsonResponse, ApiProtocol, ApiCall } from 'src/schemas';
import { loginUser, logoutUser, registerUser } from '../trpc';
import { displayErrorMessage, displaySuccessMessage } from '@utils';
import type { UserSignupData, UserLoginData } from 'src/schemas';
import { sendHttpRequest } from '.';

export const apiCall = async (
  params: ApiCall,
  showToast: boolean,
  protocol: ApiProtocol,
): Promise<JsonResponse | void> => {
  try {
    let response;

    if (protocol === 'trpc') {
      if (params.action === 'signup') {
        response = await registerUser(params.body as UserSignupData);
      } else if (params.action === 'login') {
        response = await loginUser(params.body as UserLoginData);
      } else if (params.action === 'logout') {
        response = await logoutUser();
      } else {
        throw new Error('Invalid API action.');
      }
    } else if (protocol === 'rest') {
      response = await sendHttpRequest(params);
    } else {
      throw new Error('Invalid API protocol.');
    }

    if (showToast) {
      displaySuccessMessage(response.message);
    }

    return response as JsonResponse;
  } catch (err) {
    if (params.controller === 'tweets' && params.action === 'get') return;
    displayErrorMessage(err);
    return;
  }
};
