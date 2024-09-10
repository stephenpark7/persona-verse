import { useUserStateStub } from '@mocks';
import { render, screen } from '@testing-library/react';
import { UserType } from '@factories';
import { WelcomeMessage } from '@components';

const renderWelcomeMessage = (userType: UserType) => {
  const useUserState = useUserStateStub(userType);
  const { jwt, isLoggedIn } = useUserState();
  render(<WelcomeMessage jwt={jwt} isLoggedIn={isLoggedIn} />);
};

describe('When rendering the welcome message', () => {
  describe('while logged out', () => {
    it('displays a prompt to create an account or log in', () => {
      renderWelcomeMessage(UserType.GUEST);
      expect(
        screen.getByText('Create an account or log in.'),
      ).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    it('displays a welcome message', () => {
      renderWelcomeMessage(UserType.USER);
      expect(screen.getByText('Welcome john-doe!')).toBeInTheDocument();
    });
  });
});
