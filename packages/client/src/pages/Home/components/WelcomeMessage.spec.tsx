import { useUserStateStub } from '@mocks';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserType, useUserStateFactory } from '@factories';
import { WelcomeMessage } from '@pages';

describe('WelcomeMessage Component', () => {
  describe('when logged out', () => {
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
});
