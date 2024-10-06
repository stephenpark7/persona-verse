import type { ReactElement, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { type RootState, renderWithProviders } from '@redux';
import {
  type RenderOptions as origRenderOptions,
  render as origRender,
} from '@testing-library/react';
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
