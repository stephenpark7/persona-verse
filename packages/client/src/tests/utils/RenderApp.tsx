import React from 'react';
import { z } from 'zod';
import { renderWithProviders, Router } from '@core';
import { PreloadedStateSchema } from '@interfaces';

export const renderApp = (
  rootComponent: React.ReactElement | null = <Router />,
  preloadedState?: z.infer<typeof PreloadedStateSchema>,
) => {
  renderWithProviders(rootComponent ?? <Router />, {
    preloadedState,
  });
};
