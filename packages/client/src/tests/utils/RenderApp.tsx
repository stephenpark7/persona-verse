import React from 'react';
import { z } from 'zod';
import { renderWithProviders, Router } from '@core';
import { PreloadedStateSchema } from '@interfaces';
import { RootState } from '@redux';

export const renderApp = (
  rootComponent: React.ReactElement | null = <Router />,
  preloadedState?: Partial<RootState>,
) => {
  renderWithProviders(rootComponent ?? <Router />, {
    preloadedState,
  });
};
