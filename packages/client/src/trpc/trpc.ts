import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/trpc';
import type { JsonResponse, UserLoginData, UserSignupData } from '@schemas';
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
}: UserSignupData): Promise<JsonResponse> => {
  return await trpc.registerUser.mutate({
    username,
    email,
    password,
  });
};

export const loginUser = async ({
  username,
  password,
}: UserLoginData): Promise<JsonResponse> => {
  return await trpc.loginUser.mutate({
    username,
    password,
  });
};

export const logoutUser = async (): Promise<JsonResponse> => {
  return await trpc.logoutUser.mutate();
};
