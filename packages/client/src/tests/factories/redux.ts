import { UserState, reducer, Reducer, BrowserState } from '@schemas';
import { RootState } from '@redux';
import { jwtFactory } from './jwt';

export const preloadedStateFactory = (overrides = {}) => {
  const userStateData: UserState = {
    value: {
      jwt: jwtFactory(),
      tweets: null,
    },
  };

  const browserStateData: BrowserState = {
    value: {
      docTitle: 'PersonaVerse',
    },
  };

  const reducerData: Reducer = {
    user: userStateData,
    browser: browserStateData,
  };

  reducer.parse(reducerData);

  const preloadedState: Partial<RootState> = {
    ...reducerData,
    ...overrides,
  };

  reducer.parse(preloadedState);

  return preloadedState;
};
