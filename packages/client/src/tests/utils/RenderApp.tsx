import { renderWithProviders, Router } from '@core';
import { State, TweetData } from '@interfaces';
import { BaseQueryFn, CombinedState, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, QueryDefinition } from '@reduxjs/toolkit/query';
import { mockJwt } from '../mocks';

type PreloadedState = Partial<{
  user: State;
  tweetAPI: CombinedState<{
    getTweets: QueryDefinition<
      void,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
      never,
      TweetData[],
      "tweetAPI"
    >;
  }, never, "tweetAPI">;
}> | undefined;

export const renderApp = (
  preloadedState?: PreloadedState,
) => {
  renderWithProviders(<Router />, { preloadedState });
};

export const StoreStateStubs = {
  loggedIn: {
    user: {
      value: {
        jwt: mockJwt,
        tweets: null,
      },
    },
  },
}