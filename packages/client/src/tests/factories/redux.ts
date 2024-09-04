import { PreloadedStateSchema } from '@interfaces';
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

  PreloadedStateSchema.parse({
    ...preloadedState,
    ...overrides,
  });

  return preloadedState;
};
