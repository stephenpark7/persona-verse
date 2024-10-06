import type { FC, JSX } from 'react';
import { Router } from '@router';
import { ReduxProvider } from '@redux';
import { Toast } from '@components';
import 'react-toastify/dist/ReactToastify.css';
import '@assets/styles/App.css';

export const App: FC = (): JSX.Element => {
  return (
    <ReduxProvider>
      <Router />
      <Toast />
    </ReduxProvider>
  );
};
