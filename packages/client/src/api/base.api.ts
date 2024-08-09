import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { JsonResponse, ApiCall, ApiProtocol } from '../interfaces';
import { refreshToken } from './refresh.api';
import { getTweets, postTweet } from './tweets.api';
import { register, login, logout } from './users.api';
import { BASE_API_URL } from '../utils';
import { loginUser, LoginUserParams, logoutUser, registerUser, RegisterUserParams } from '../trpc';

function apiUrl(controller: string, action: string): string {
  if (!BASE_API_URL || !controller || action === undefined) {
    throw new Error(`Invalid API URL: ${BASE_API_URL}${controller}${action}`);
  }
  return `${BASE_API_URL}${controller}/${action}`;
}

async function sendHttpRequest(params: ApiCall): Promise<JsonResponse> {
  const { method, controller, action, body, options, headers } = params;

  const config: AxiosRequestConfig = {
    url: apiUrl(controller, action),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    } as RawAxiosRequestHeaders,
    method,
    data: body,
    ...options,
  };

  const response: AxiosResponse = await axios.request(config);

  return response.data;
}

export async function apiCall(
  params: ApiCall,
  showToast: boolean,
  protocol: ApiProtocol,
): Promise<JsonResponse | void> {
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
  catch (err: AxiosError | Error | unknown) {
    displayErrorMessage(err);
    return;
  }
}

function displayErrorMessage(err: AxiosError | Error | unknown, autoClose?: number): string {
  let message;

  if (err instanceof AxiosError) {
    message = err.response?.data.message || err.message;
  }
  else if (err instanceof Error) {
    message = err.message;
  }

  message ||= 'An unexpected error occurred.';

  toast.error(message, { autoClose });
  return message;
}

function displaySuccessMessage(message: string, autoClose?: number): void {
  toast.success(message, { autoClose });
}

export {
  BASE_API_URL,
  login,
  register,
  logout,
  getTweets,
  postTweet,
  refreshToken,
};
