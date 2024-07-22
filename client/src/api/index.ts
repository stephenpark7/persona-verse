import { toast } from 'react-toastify';
import { FormData, HTTPResponse } from '../interfaces';
import { register, login, logout } from './users';
import { getTweets, postTweet } from './tweets';
import { refreshToken } from './refresh';
import useFetchIntercept from './fetchIntercept';

export async function apiCall(
  method: string,
  controller: string,
  action: string,
  body: FormData, // TODO: rename this
  options?: RequestInit,
  headers?: Record<string, string>,
): Promise<HTTPResponse> {
  const hostname = process.env.API_HOST_NAME;
  const port = process.env.API_PORT;
  const url = `http://${hostname}:${port}`;

  const response = await fetch(`${url}/api/${controller}/${action}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    ...options,
  });

  const responseData: HTTPResponse = await response.json();

  if (!response.ok) {
    const errorMessage = responseData?.message ?? 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }

  return responseData;
}

export function handleError(err: unknown, autoClose?: number): void {
  if (err instanceof Error) {
    toast.error(err.message, { autoClose });
  }
}

useFetchIntercept();

export default {
  login,
  register,
  logout,
  getTweets,
  postTweet,
  refreshToken,
};
