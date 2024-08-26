import { renderWithProviders, Router } from '@core';
import type { RootState } from '@redux';
import { mockJwt } from '../mocks';

export const renderApp = (
  rootComponent: React.ReactElement = <Router />,
  preloadedState?: RootState,
) => {
  renderWithProviders(rootComponent, { preloadedState });
};

export const fgStoreStateStubs = {
  loggedIn: {
    user: {
      value: {
        jwt: mockJwt,
        tweets: null,
      },
    },
  },
}
