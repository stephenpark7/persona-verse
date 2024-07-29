import React from 'react';
import { QueryProvider, ReduxProvider, Router, Toast } from './core';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App: React.FC = (): React.JSX.Element => {
  return (
    <ReduxProvider>
      <QueryProvider>
        <Router />
        <Toast />
      </QueryProvider>
    </ReduxProvider>
  );
};
