import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

// TODO: mock packages/client/src/core/Router.tsx instead of using BrowserRouter

export const renderPage = (
  component: React.ReactElement,
  clearAllMocks = true,
) => {
  if (clearAllMocks) {
    vi.clearAllMocks();
  }

  return render(<BrowserRouter>{component}</BrowserRouter>);
};
