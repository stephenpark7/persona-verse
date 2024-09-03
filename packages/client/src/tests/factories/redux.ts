import { PreloadedStateSchema } from '@interfaces';

export const PreloadedStateFactory = (overrides = {}) => {
  const user = {
    state: {
      value: {
        jwt: {
          token: '1',
          expiresAt: Date.now() + 1000,
          payload: {
            userId: 1,
            username: 'john-doe',
          },
        },
        tweets: [],
      },
    },
  };

  const tweetAPI = {
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {
      reducerPath: 'tweetAPI',
      online: true,
      focused: true,
      middlewareRegistered: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
      keepUnusedDataFor: 0,
      invalidationBehavior: 'immediately',
    },
  };

  return PreloadedStateSchema.parse({
    ...user,
    ...tweetAPI,
    ...overrides,
  });
};
