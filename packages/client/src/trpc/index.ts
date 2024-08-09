import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/trpc';
import { JsonResponse } from '../interfaces';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
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

export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  username: string;
  password: string;
}

const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserParams): Promise<JsonResponse> => {
  return await trpc.registerUser.mutate({ username, email, password });
};

type TRPCResponse = {
  message: string;
  jwt?: {
    token: string;
    expiresAt: number;
  };
  profile?: object | null;
} | { message: string };

export const loginUser = async ({
  username,
  password,
}: LoginUserParams): Promise<TRPCResponse> => {

  return await trpc.loginUser.mutate({ username, password });
};

// Inferred types
// const getUsers = async () => {
//   return await trpc.userList.query();
// };

// const createdUser = await trpc.userCreate.mutate({ name: 'foo' });

export { registerUser };
