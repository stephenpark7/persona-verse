import React from 'react';
import { ReduxProvider, Toast } from '@core';
import { Router } from '@router';
import 'react-toastify/dist/ReactToastify.css';
import '@assets/styles/App.css';

export const App: React.FC = (): React.JSX.Element => {
  return (
    <ReduxProvider>
      <Router />
      <Toast />
    </ReduxProvider>
  );
};
