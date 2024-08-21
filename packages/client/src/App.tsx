import React from 'react';
import { ReduxProvider, renderWithProviders, Router, Toast } from '@core';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';

export const App: React.FC = (): React.JSX.Element => {
  return (
    // <ReduxProvider>
    renderWithProviders(
      <>
        <Router />
        <Toast />
      </>
    ),
    // </ReduxProvider>
  );
};
