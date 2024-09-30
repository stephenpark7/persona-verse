import { ReactNode } from 'react';
import { screen, render } from '@tests/helpers';
import { App } from './App';

vi.mock('@core', () => ({
  ReduxProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
  Toast: ({ children }: { children: ReactNode }) => (
    <div data-testid="toast">{children}</div>
  ),
}));

vi.mock('@router', () => ({
  Router: ({ children }: { children: ReactNode }) => (
    <div data-testid="router">{children}</div>
  ),
}));

describe('When rendering the App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('should render the ReduxProvider component', () => {
    expect(screen.getByTestId('redux-provider')).toBeInTheDocument();
  });

  it('should render the Router component', () => {
    expect(screen.getByTestId('router')).toBeInTheDocument();
  });

  it('should render the Toast component', () => {
    expect(screen.getByTestId('toast')).toBeInTheDocument();
  });
});
