import React from 'react';
import { renderWithProviders, Router } from '@core';
import type { RootState } from '@redux';
// import { jwtFactory } from '@factories';

export const renderApp = (
  rootComponent: React.ReactElement = <Router />,
  preloadedState?: RootState,
) => {
  renderWithProviders(rootComponent, {
    preloadedState,
  });
};

// export const fgStoreStateStubs = {
//   loggedIn: {
//     user: {
//       value: {
//         jwt: jwtFactory(),
//         tweets: null,
//       },
//     },
//   },
// };
