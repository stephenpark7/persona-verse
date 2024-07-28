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

  // const response: Response = await fetch(apiUrl(controller, action), {
  //   method: method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     ...headers,
  //   },
  //   body: body ? JSON.stringify(body) : null,
  //   ...options,
  // });

  // const client = axios.create({
  //   baseURL: apiUrl(controller, action),
  // });

  const config: AxiosRequestConfig = {
    baseURL: apiUrl(controller, action),
    headers: {
      'Content-Type': 'application/json',
    } as RawAxiosRequestHeaders,
    method,
    data: body,
    // ...options,  
    // ...headers,
  };
  
  const response: AxiosResponse = await axios.request(config);

  //   url: apiUrl(controller, action),
  //   method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     ...headers,
  //   },
  //   data: body,
  //   ...options,
  // });

  // const jsonResponse: JsonResponse = await response.json();
  console.log('response', response);

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
