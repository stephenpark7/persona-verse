import React from 'react';
import { Provider } from 'react-redux';
import { AppStore, setupStore, RootState, store } from '@redux';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement, {
    preloadedState = {}, 
    store = setupStore(preloadedState), 
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

interface ReduxProviderProps {
  children: React.ReactNode;
};

export const ReduxProvider = ({
  children,
}: ReduxProviderProps): React.JSX.Element => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};