import { renderWithProviders, Router } from '@core';
import type { RootState } from '@redux';
import { mockJwt } from '../mocks';

export const renderApp = (
  preloadedState?: RootState,
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
