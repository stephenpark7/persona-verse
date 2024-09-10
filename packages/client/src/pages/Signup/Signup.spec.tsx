import { useUserStateStub } from '@mocks';
import { describe, beforeEach, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { renderPage } from '@helpers';
import { Signup } from '@pages';

describe('Signup page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      useUserStateStub(UserType.GUEST);
      renderPage(<Signup />);
    });

    it('renders h1', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Sign up',
      );
    });

    it('renders input fields', () => {
      expect(
        screen.getByRole('textbox', { name: 'Username' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Email' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      expect(
        screen.getByRole('button', { name: 'Sign up' }),
      ).toBeInTheDocument();
    });
  });
});
