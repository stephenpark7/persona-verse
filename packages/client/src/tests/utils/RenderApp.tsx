import React from 'react';
import { renderWithProviders, Router } from '@core';
import type { RootState } from '@redux';

export const renderApp = (
  rootComponent: React.ReactElement = <Router />,
  preloadedState?: RootState,
) => {
  renderWithProviders(rootComponent, {
    preloadedState,
  });
};
