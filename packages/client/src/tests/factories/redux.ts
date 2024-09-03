import { PreloadedStateSchema } from '@interfaces';
import { jwtFactory } from './jwt';

export const PreloadedStateFactory = (overrides = {}) => {
  const user = {
    state: {
      value: {
        jwt: jwtFactory(),
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
