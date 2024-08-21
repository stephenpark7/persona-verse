import { renderWithProviders, Router } from '@core';

export const RenderApp = (preloadedState?: Record<string, unknown>) => {
  renderWithProviders(<Router />, { preloadedState });
};
