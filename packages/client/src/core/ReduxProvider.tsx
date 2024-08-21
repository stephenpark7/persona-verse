import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, setupStore, RootState } from '@redux';
import { render, RenderOptions } from '@testing-library/react';
// import { store } from '@redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>,
  store?: AppStore,
}

export const renderWithProviders = (
  ui: React.ReactElement, {
    preloadedState = {}, 
    store = setupStore(preloadedState), 
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  
  const Wrapper: React.FC<PropsWithChildren> = ({
    children,
  }): JSX.Element => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// interface ReduxProviderProps {
//   children: React.JSX.Element[] | React.JSX.Element;
// };

// export const ReduxProvider = ({
//   children,
// }: ReduxProviderProps): React.JSX.Element => {
//   return (
//     <Provider store={store}>
//       {children}
//     </Provider>
//   );
// };
