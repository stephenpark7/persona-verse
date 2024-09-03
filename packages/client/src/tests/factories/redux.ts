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

  return PreloadedStateSchema.parse({
    user: user,
    tweetAPI: {
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
    },
    ...overrides,
  });
  // return PreloadedStateSchema.parse({
  //   user: {
  //     value: {
  //       state: {
  //         value: {
  //           jwt: JWTSchema.parse({
  //             token:
  //               'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSm9obiBEb2UifQ==',
  //             expiresAt: Date.now() + 1000,
  //             payload: {
  //               userId: 1,
  //               username: 'john-doe',
  //             },
  //           }),
  //           tweets: [],
  //         },
  //       },
  //     },
  //   },
  //   tweetAPI: {
  //     queries: {},
  //     mutations: {},
  //     provided: {
  //       Tweets: {},
  //     },
  //     subscriptions: {},
  //     config: {
  //       reducerPath: 'tweetAPI',
  //       online: true,
  //       focused: true,
  //       middlewareRegistered: true,
  //       refetchOnMountOrArgChange: true,
  //       refetchOnReconnect: true,
  //       refetchOnFocus: true,
  //       keepUnusedDataFor: 0,
  //       invalidationBehavior: 'immediately',
  //     },
  //   },
  //   ...overrides,
  // });
};
