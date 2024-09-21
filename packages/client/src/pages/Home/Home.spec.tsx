import { useUserStateStub } from '@mocks/hooks';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { Home } from '@pages';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '@core';

vi.mock('@components', () => ({
  Header: () => <div data-testid="header" />,
  WelcomeMessage: () => <div data-testid="welcomeMessage" />,
  ContentSection: () => <div data-testid="contentSection" />,
  Navbar: () => <div data-testid="navbar" />,
}));

describe('When rendering the home page', () => {
  beforeEach(() => {
    useUserStateStub(UserType.GUEST);
    renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
  });

  it('renders header component', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders WelcomeMessage component', () => {
    expect(screen.getByTestId('welcomeMessage')).toBeInTheDocument();
  });

  it('renders ContentSection component', () => {
    expect(screen.getByTestId('contentSection')).toBeInTheDocument();
  });
});
