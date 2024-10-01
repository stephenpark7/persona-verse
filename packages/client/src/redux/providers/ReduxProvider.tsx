import type { ReactNode, PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { type RenderOptions, render } from '@tests/helpers';
import { AppStore, RootState, setupStore, store } from '@redux';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

type RenderWithProviders = (
  ui: ReactElement,
  options?: ExtendedRenderOptions,
) => {
  store: AppStore;
};

export const renderWithProviders: RenderWithProviders = (
  ui,
  extendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider = ({
  children,
}: ReduxProviderProps): React.JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
