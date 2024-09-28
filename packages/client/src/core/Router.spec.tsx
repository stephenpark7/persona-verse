import { screen } from '@testing-library/react';
import { renderWithProviders, Router } from '@core';

describe('Router', () => {
  beforeEach(() => {
    renderWithProviders(<Router />);
  });

  it.only('renders home page by default', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'PersonaVerse',
    );
  });
});
