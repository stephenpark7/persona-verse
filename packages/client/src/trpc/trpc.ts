import {
  type Operation,
  type TRPCLink,
  TRPCClientError,
  createTRPCProxyClient,
  httpLink,
  httpBatchLink,
} from '@trpc/client';
import { observable } from '@trpc/server/observable';
import type { AppRouter } from 'server/src/trpc';
import {
  type JsonResponse,
  type Jwt,
  type TrpcFunction,
  registerFormFields,
  loginFormFields,
} from '@schemas';
import { apiConfig } from '@utils';
import { clearJwt, setJwt, store, tweetAPI } from '@redux';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { TRPCError } from '@trpc/server';

let retryCount = 0;

const authLink: TRPCLink<AppRouter> = () => {
  return ({ next, op }) => {
    const maxRetries = 1;

    return observable((observer) => {
      const makeRequest = (operation: Operation) => {
        const unsubscribe = next(operation).subscribe({
          next(value) {
            observer.next(value);
          },
          async error(err) {
            const response = err.meta?.response as Response;

            if (!response) {
              observer.error(
                new TRPCClientError(
                  'Server is not available. Please try again later.',
                ),
              );
              return;
            }

            if (response.status === 401) {
              if (retryCount > maxRetries) {
                return;
              }

              retryCount++;

              try {
                const response = await refreshJwt({});
                store.dispatch(setJwt(response.jwt as Jwt));
                store.dispatch(tweetAPI.util.invalidateTags(['Tweets']));
                makeRequest(operation);
              } catch {
                store.dispatch(clearJwt());
                observer.error(new TRPCClientError('Unauthorized.'));
              }
            } else if (response.status === 500) {
              observer.error(new TRPCClientError(err.message));
            }
          },
          complete() {
            observer.complete();
          },
        });
        return unsubscribe;
      };

      return makeRequest(op);
    });
  };
};

const isHttpBatchEnabled = process.env.NODE_ENV === 'test';

const httpFlexibleLink = isHttpBatchEnabled ? httpLink : httpBatchLink;

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    authLink,
    httpFlexibleLink({
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
      headers(url: { opList?: { path: string }[]; op?: { path: string } }) {
        const token = store.getState().user.value.jwt?.token;
        const path = isHttpBatchEnabled ? url.opList?.[0]?.path : url.op?.path;
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

export const registerUser: TrpcFunction = async ({
  username,
  email,
  password,
}): Promise<JsonResponse> => {
  if (!username || !email || !password) {
    throw new Error('Failed to register user.');
  }

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

export const loginUser: TrpcFunction = async ({
  username,
  password,
}): Promise<JsonResponse> => {
  if (!username || !password) {
    throw new Error('Failed to login user.');
  }

  loginFormFields.parse({
    username,
    password,
  });

  return await trpc.loginUser.mutate({
    username,
    password,
  });
};

export const logoutUser: TrpcFunction = async (): Promise<JsonResponse> => {
  return await trpc.logoutUser.mutate();
};

export const createTweet: TrpcFunction = async ({
  message,
}): Promise<JsonResponse> => {
  if (!message) {
    throw new Error('Failed to create tweet.');
  }

  return await trpc.createTweet.mutate({
    message,
  });
};

export const getTweets: TrpcFunction = async (): Promise<JsonResponse> => {
  return await trpc.getTweets.query();
};

export const refreshJwt: TrpcFunction = async (): Promise<JsonResponse> => {
  return await trpc.refreshJwt.mutate();
};
