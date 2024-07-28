import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import { store } from '../stores';

interface ProviderProps {
  children: React.JSX.Element[];
};

export const Provider = ({ children }: ProviderProps): React.JSX.Element => {
  return (
    <ReactReduxProvider store={store}>
      {children}
    </ReactReduxProvider>
  );
};
