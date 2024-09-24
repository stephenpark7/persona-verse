import { createTRPCProxyClient, httpBatchLink, TRPCLink } from '@trpc/client';
import { observable } from '@trpc/server/observable';
import type { AppRouter } from 'server/src/trpc';
import {
  type JsonResponse,
  type RegisterFormFields,
  type LoginFormFields,
  registerFormFields,
  loginFormFields,
} from '@schemas';
import { apiConfig } from '@utils';
import { store } from '@redux';

// const fetchHeaders = (
//   url: URL | RequestInfo,
//   options: RequestInit | undefined,
// ) => {
//   // if (
//   //   (url as string).endsWith('/api/refresh/') ||
//   //   options?.headers?.Authorization
//   // ) {
//   //   return options;
//   // }

//   const token = store.getState().user.value.jwt?.token;
//   if (!token) {
//     return options;
//   }

//   options = options || {};
//   options.headers = options?.headers || new Headers();
//   options.headers = {
//     ...options?.headers,
//     Authorization: `Bearer ${token}`,
//   };

//   return options;
// };

// const ac = new AbortController();

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
            const token = await refreshJwt();
            console.log(token);
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
      // fetch: async (url, options) => {
      //   const originalRequest = fetch(url, {
      //     ...options,
      //     credentials: 'include',
      //   });
      //   return originalRequest;
      // },
      headers() {
        const token = store.getState().user.value.jwt?.token;
        if (!token) {
          return {};
        }
        return {
          Authorization: `Bearer ${token}`,
        };
      },
      // async fetch(url, options) {
      //   const originalRequest = fetch(url, {
      //     ...fetchHeaders(url, options),
      //     credentials: 'include',
      //   });
      //   const response = await originalRequest;
      //   console.log(response.status);
      //   if (response.status === 401) {
      //     const accessToken = await refreshToken();
      //     console.log('accessToken', accessToken);
      //     if (!accessToken) {
      //       store.dispatch(clearJwt());
      //       return originalRequest;
      //     }
      //     const headers = fetchHeaders(url, options)?.headers;
      //     return fetch(url, {
      //       ...options,
      //       headers: {
      //         ...headers,
      //         Authorization: `Bearer ${accessToken.token}`,
      //       },
      //     });
      //   }
      //   return originalRequest;
      // },
    }),
  ],
});

// const query = trpc.getTweets.query(undefined, { signal: ac.signal });
// console.log(query);
// ac.abort();

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
