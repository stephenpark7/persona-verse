import { UserState, reducer, Reducer, BrowserState } from '@schemas';
import { RootState } from '@redux';
import { jwtFactory } from './jwt';
import { tweetFactory } from './tweet';

export const preloadedStateFactory = (overrides = {}) => {
  const userStateData: UserState = {
    value: {
      jwt: jwtFactory(),
      tweets: [tweetFactory()],
      profile: null,
      ...overrides,
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
  };

  reducer.parse(preloadedState);

  return preloadedState;
};
