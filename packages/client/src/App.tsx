import React from 'react';
import { ReduxProvider, Router, Toast } from '@core';
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
