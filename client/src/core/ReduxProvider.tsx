import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../stores';

interface ReduxProviderProps {
  children: React.JSX.Element[] | React.JSX.Element;
};

export const ReduxProvider = ({ children }: ReduxProviderProps): React.JSX.Element => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
