import { toast } from 'react-toastify';
import { JsonResponse, ApiCall } from '../interfaces/api';
import { refreshToken } from './refresh.api';
import { register, login, logout } from './users.api';
import { getTweets, postTweet } from './tweets.api';

function apiUrl(controller: string, action: string): string {
  const protocol = process.env.API_PROTOCOL;
  const port = process.env.API_PORT;
  const hostName = process.env.API_HOST_NAME;
  return `${protocol}://${hostName}:${port}/api/${controller}/${action}`;
}

async function sendHttpRequest(params: ApiCall): Promise<JsonResponse> {
  const { method, controller, action, body, options, headers } = params;

  const response: Response = await fetch(apiUrl(controller, action), {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    ...options,
  });

  const jsonResponse: JsonResponse = await response.json();

  if (!response.ok) {
    const errorMessage: string = jsonResponse.message ?? 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }

  return jsonResponse;
}

export async function apiCall(params: ApiCall): Promise<JsonResponse> {
  // should handle error here instead of in each function
  return await sendHttpRequest(params);
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
