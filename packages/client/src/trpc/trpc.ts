import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/trpc';
import type { JsonResponse } from '../interfaces';
import type { LoginUserParams, RegisterUserParams, Response } from './types';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      // TODO: use ENV variables for the URL
      url: 'http://localhost:3001/trpc',
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserParams): Promise<JsonResponse> => {
  return await trpc.registerUser.mutate({ 
    username, 
    email, 
    password,
  });
};

export const loginUser = async ({
  username,
  password,
}: LoginUserParams): Promise<Response> => {
  return await trpc.loginUser.mutate({ 
    username, 
    password, 
  });
};

export const logoutUser = async (): Promise<JsonResponse> => {
  return await trpc.logoutUser.mutate();
};