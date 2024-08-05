import { toast } from 'react-toastify';
import { JsonResponse, ApiCall } from '../interfaces';
import { refreshToken } from './Refresh/refresh.api';
import { register, login, logout } from './Users';
import { getTweets, postTweet } from './Tweets';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

const ENV = {
  API_PROTOCOL: import.meta.env.VITE_API_PROTOCOL as string,
  API_HOST_NAME: import.meta.env.VITE_API_HOST_NAME as string,
  API_PORT: import.meta.env.VITE_API_PORT as string,
};

const BASE_API_URL: string = `${ENV.API_PROTOCOL}://${ENV.API_HOST_NAME}:${ENV.API_PORT}/api/`;

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

export async function apiCall(params: ApiCall, showToast: boolean): Promise<JsonResponse | void> {
  try {
    const response = await sendHttpRequest(params);
    if (showToast) {
      displaySuccessMessage(response.message);
    }
    return response;
  }
  catch (err: AxiosError | unknown) {
    displayErrorMessage(err);
    return;
  }
}

function displayErrorMessage(err: AxiosError | unknown, autoClose?: number): string {
  let message = 'An unexpected error occurred.';

  if (err instanceof AxiosError && err.response?.data.message) {
    message = err.response.data.message;
  }

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
