import React from 'react';
import { renderWithProviders, Router } from '@core';
import { RootState } from '@redux';

export const renderApp = (
  rootComponent?: React.ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  renderWithProviders(rootComponent ?? <Router />, {
    preloadedState,
  });
};
