import type { ReactElement, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  RenderOptions as origRenderOptions,
  render as origRender,
} from '@testing-library/react';
import { type RootState, renderWithProviders } from '@redux';

export const render = origRender;

export const renderWithRouter = (
  ui?: ReactElement,
  preloadedState?: Partial<RootState>,
  router: FC | typeof BrowserRouter = BrowserRouter,
) => {
  const RouterComponent = router;

  return renderWithProviders(<RouterComponent>{ui}</RouterComponent>, {
    preloadedState,
  });
};

export type RenderOptions = origRenderOptions;
