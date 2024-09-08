import { useUserStateStub } from '@mocks';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserType } from '@factories';
import { WelcomeMessage } from '@pages';

const renderWelcomeMessage = (userType: UserType) => {
  const useUserState = useUserStateStub(userType);
  const { jwt, isLoggedIn } = useUserState();
  render(<WelcomeMessage jwt={jwt} isLoggedIn={isLoggedIn} />);
};

describe('WelcomeMessage Component', () => {
  describe('while logged out', () => {
    test('renders the welcome message', () => {
      renderWelcomeMessage(UserType.GUEST);
      expect(
        screen.getByText('Create an account or log in.'),
      ).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    test('renders the welcome message', () => {
      renderWelcomeMessage(UserType.USER);
      expect(screen.getByText('Welcome john-doe!')).toBeInTheDocument();
    });
  });
});
