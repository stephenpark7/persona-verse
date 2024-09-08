import { useUserStateStub } from '@mocks';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserType, useUserStateFactory } from '@factories';
import { WelcomeMessage } from '@pages';

describe('WelcomeMessage Component', () => {
  describe('while logged out', () => {
    test('renders the welcome message', () => {
      useUserStateStub(UserType.GUEST);
      const useUserState = () => useUserStateFactory(UserType.GUEST);
      const { jwt, isLoggedIn } = useUserState();
      render(<WelcomeMessage jwt={jwt} isLoggedIn={isLoggedIn} />);
      expect(
        screen.getByText('Create an account or log in.'),
      ).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    test('renders the welcome message', () => {
      useUserStateStub(UserType.USER);
      const useUserState = () => useUserStateFactory(UserType.USER);
      const { jwt, isLoggedIn } = useUserState();
      render(<WelcomeMessage jwt={jwt} isLoggedIn={isLoggedIn} />);
      expect(screen.getByText('Welcome john-doe!')).toBeInTheDocument();
    });
  });
});
