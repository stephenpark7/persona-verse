import { BrowserRouter } from 'react-router-dom';
import { render as origRender } from '@testing-library/react';
import { renderWithProviders } from '@core';
import { Router } from '@router';
import type { RootState } from '@redux';

export const render = (ui: React.ReactElement) => origRender(ui);

export const renderPage = (
  component: React.ReactElement,
  clearAllMocks = true,
) => {
  if (clearAllMocks) {
    vi.clearAllMocks();
  }

  return render(<BrowserRouter>{component}</BrowserRouter>);
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
// preloadedState
//   ? renderWithProviders(<BrowserRouter>{ui}</BrowserRouter>, {
//       preloadedState,
//     })
//   : render(<BrowserRouter>{ui}</BrowserRouter>);

export const renderApp = (
  rootComponent?: React.ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  renderWithProviders(rootComponent ?? <Router />, {
    preloadedState,
  });
};

// NOTE: we could also just mock routes for router
