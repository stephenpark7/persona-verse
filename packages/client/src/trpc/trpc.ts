import { createTRPCProxyClient, httpBatchLink, TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import type { AppRouter } from 'server/src/trpc';
import {
  type JsonResponse,
  type RegisterFormFields,
  type LoginFormFields,
  registerFormFields,
  loginFormFields,
  type Jwt,
} from '@schemas';
import { apiConfig } from '@utils';
import { setJwt, store } from '@redux';

const authLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      console.log('performing operation:', op);
      const unsubscribe = next(op).subscribe({
        next(value) {
          console.log('we received value', value);
          observer.next(value);
        },
        async error(err) {
          const response = err.meta?.response as Response;
          if (response.status === 401) {
            const response = await refreshJwt();
            store.dispatch(setJwt(response.jwt as Jwt));
            // TODO: store.dispatch(setJwt(token));
          }
          observer.error(err);
        },
        complete() {
          console.log('we are done');
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    authLink,
    httpBatchLink({
      url: apiConfig.trpcUrl,
      fetch: async (url, options) => {
        const requestURL = new URL(url as string);
        const originalRequest = fetch(url, {
          ...options,
          credentials:
            requestURL.pathname.endsWith('loginUser') ||
            requestURL.pathname.endsWith('logoutUser') ||
            requestURL.pathname.endsWith('refreshJwt')
              ? 'include'
              : 'omit',
        });
        return originalRequest;
      },
      headers(url) {
        const token = store.getState().user.value.jwt?.token;
        const path = url.opList[0].path;
        if (
          !token ||
          path === 'registerUser' ||
          path === 'loginUser' ||
          path === 'logoutUser' ||
          path === 'refreshJwt'
        ) {
          return {};
        }
        return {
          Authorization: `Bearer ${token}`,
        };
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

export const createTweet = async (message: string): Promise<JsonResponse> => {
  return await trpc.createTweet.mutate({
    message,
  });
};

export const getTweets = async (): Promise<JsonResponse> => {
  return await trpc.getTweets.query();
};

export const refreshJwt = async (): Promise<JsonResponse> => {
  return await trpc.refreshJwt.mutate();
};
