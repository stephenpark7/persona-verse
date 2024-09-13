import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/trpc';
import {
  type JsonResponse,
  type RegisterFormFields,
  type LoginFormFields,
  registerFormFields,
  loginFormFields,
} from '@schemas';
import { apiConfig } from '@utils';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: apiConfig.trpcUrl,
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
}: RegisterFormFields): Promise<JsonResponse> => {
  registerFormFields.parse({
    username,
    email,
    password,
  });

  return await trpc.registerUser.mutate({
    username,
    email,
    password,
  });
};

export const loginUser = async ({
  username,
  password,
}: LoginFormFields): Promise<JsonResponse> => {
  loginFormFields.parse({
    username,
    password,
  });

  return await trpc.loginUser.mutate({
    username,
    password,
  });
};

export const logoutUser = async (): Promise<JsonResponse> => {
  return await trpc.logoutUser.mutate();
};
