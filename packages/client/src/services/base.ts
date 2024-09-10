import {
  apiProtocol,
  httpRequestParams,
  JsonResponse,
  HttpRequestParams,
} from '@schemas';
import type { ApiProtocol } from '@schemas';
import { loginUser, logoutUser, registerUser } from '../trpc';
import { displayErrorMessage, displaySuccessMessage } from '@utils';
import type { RegisterFormFields, LoginFormFields } from '@schemas';
import { sendHttpRequest } from '.';

export const apiCall = async (
  params: HttpRequestParams,
  showToast?: boolean,
  protocol?: ApiProtocol,
): Promise<JsonResponse | void> => {
  try {
    httpRequestParams.parse(params);
    apiProtocol.parse(protocol);

    let response;

    if (protocol === 'trpc') {
      if (params.action === 'signup') {
        response = await registerUser(params.body as RegisterFormFields);
      } else if (params.action === 'login') {
        response = await loginUser(params.body as LoginFormFields);
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
