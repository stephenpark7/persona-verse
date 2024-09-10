import { user, state } from '@schemas';
import { RootState } from '@redux';
import { jwtFactory } from './jwt';

export const PreloadedStateFactory = (overrides = {}) => {
  const stateData = {
    value: {
      jwt: jwtFactory(),
      tweets: [],
    },
  };

  state.parse(stateData);

  const preloadedState: Partial<RootState> = {
    user: stateData,
  };

  user.parse({
    ...preloadedState,
    ...overrides,
  });

  return preloadedState;
};
