import { useUserStateStub } from '@mocks/hooks';
import { describe, beforeEach, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { renderPage } from '@helpers';
import { Home } from '@pages';

vi.mock('@components', () => ({
  Header: () => <div>Header</div>,
  WelcomeMessage: () => <div>WelcomeMessage</div>,
  ContentSection: () => <div>ContentSection</div>,
}));

describe('Home page', () => {
  beforeEach(() => {
    useUserStateStub(UserType.GUEST);
    renderPage(<Home />);
  });

  it('renders header component', () => {
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders the WelcomeMessage component', () => {
    expect(screen.getByText('WelcomeMessage')).toBeInTheDocument();
  });

  it('renders the ContentSection component', () => {
    expect(screen.getByText('ContentSection')).toBeInTheDocument();
  });
});
