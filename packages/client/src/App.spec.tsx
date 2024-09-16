import { screen, render } from '@testing-library/react';
import { App } from './App';

vi.mock('@core', () => ({
  ReduxProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
  Router: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="router">{children}</div>
  ),
  Toast: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="toast">{children}</div>
  ),
}));

describe('App', () => {
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
