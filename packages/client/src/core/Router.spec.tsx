import { useUserStateStub } from '../tests/mocks/hooks';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { renderWithProviders, Router } from '@core';

describe('Router', () => {
  beforeEach(() => {
    useUserStateStub(UserType.GUEST);
    renderWithProviders(<Router />);
  });

  it.only('renders home page by default', () => {
    screen.debug();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'PersonaVerse',
    );
  });
});
