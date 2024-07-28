import { toast } from 'react-toastify';
import { JsonResponse, ApiCall } from '../interfaces/api';
import { refreshToken } from './refresh.api';
import { register, login, logout } from './users.api';
import { getTweets, postTweet } from './tweets.api';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

function apiUrl(controller: string, action: string): string {
  const protocol = process.env.API_PROTOCOL;
  const port = process.env.API_PORT;
  const hostName = process.env.API_HOST_NAME;
  return `${protocol}://${hostName}:${port}/api/${controller}/${action}`;
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

  if (response.statusText !== 'OK') {
    const errorMessage: string = response.data.message ?? 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }

  return response.data;
}

export async function apiCall(params: ApiCall): Promise<JsonResponse> {
  try {
    return await sendHttpRequest(params);
  }
  catch (err: unknown) {
    handleError(err);
    return {
      message: 'An unexpected error occurred.',
    };
  }
}

export function handleError(err: unknown, autoClose?: number): void {
  if (err instanceof Error) {
    toast.error(err.message, { autoClose });
  } else {
    throw new Error('An unexpected error occurred.');
  }
}

export {
  login,
  register,
  logout,
  getTweets,
  postTweet,
  refreshToken,
};
