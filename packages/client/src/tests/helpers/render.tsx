import { BrowserRouter } from 'react-router-dom';
import {
  RenderOptions as origRenderOptions,
  render as origRender,
} from '@testing-library/react';
import { type RootState, renderWithProviders } from '@redux';
import { Router } from '@router';

export const render = (ui: React.ReactElement, options?: RenderOptions) =>
  origRender(ui, options);

export const renderPage = (
  component: React.ReactElement,
  clearAllMocks = true,
) => {
  if (clearAllMocks) {
    vi.clearAllMocks();
  }

  return render(<BrowserRouter>{component}</BrowserRouter>);
};

export const renderApp = (
  rootComponent?: React.ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  renderWithProviders(rootComponent ?? <Router />, {
    preloadedState,
  });
};

export const renderWithRouter = (
  ui: React.ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  if (preloadedState) {
    return renderWithProviders(<BrowserRouter>{ui}</BrowserRouter>, {
      preloadedState,
    });
  } else {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  }
};

export type RenderOptions = origRenderOptions;
