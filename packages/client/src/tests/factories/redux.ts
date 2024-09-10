import { userSchema } from '@schemas';
import { jwtFactory } from './jwt';
import { RootState } from '@redux';

export const PreloadedStateFactory = (overrides = {}) => {
  const user = {
    value: {
      jwt: jwtFactory(),
      tweets: [],
    },
  };

  const preloadedState: Partial<RootState> = {
    user,
  };

  userSchema.parse({
    ...preloadedState,
    ...overrides,
  });

  return preloadedState;
};
