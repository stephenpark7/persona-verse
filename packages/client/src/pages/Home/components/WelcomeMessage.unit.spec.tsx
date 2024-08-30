import { render, screen } from '@testing-library/react';
import { WelcomeMessage } from '@pages';
import { beforeEach, describe, test, expect } from 'vitest';

describe('WelcomeMessage Component', () => {
  const message = 'Welcome to PersonaVerse';

  beforeEach(() => {
    render(<WelcomeMessage message={message} />);
  });

  test('renders the welcome message', () => {
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
