import { UserSchema } from '@schemas';
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

  UserSchema.parse({
    ...preloadedState,
    ...overrides,
  });

  return preloadedState;
};
