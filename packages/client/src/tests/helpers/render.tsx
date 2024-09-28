import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// TODO: mock packages/client/src/core/Router.tsx instead of using BrowserRouter
// ? not sure if necessary.

export const renderPage = (
  component: React.ReactElement,
  clearAllMocks = true,
) => {
  if (clearAllMocks) {
    vi.clearAllMocks();
  }

  return render(<BrowserRouter>{component}</BrowserRouter>);
};

export const renderWithBrowserRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);
