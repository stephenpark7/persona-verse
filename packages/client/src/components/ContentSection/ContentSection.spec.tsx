import { useUserStateStub } from '@mocks';
import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentSection } from '@components';
import { UserType } from '@factories';
import { BrowserRouter } from 'react-router-dom';

describe('ContentSection Component', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const useUserState = useUserStateStub(UserType.GUEST);
      const { isLoggedIn } = useUserState();
      render(
        <BrowserRouter>
          <ContentSection isLoggedIn={isLoggedIn} />
        </BrowserRouter>,
      );
    });

    it.only('renders the Buttons component', () => {
      expect(screen.getByText('Sign up')).toBeInTheDocument();
      expect(screen.getByText('Log in')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const useUserState = useUserStateStub(UserType.USER);
      const { isLoggedIn } = useUserState();
      render(<ContentSection isLoggedIn={isLoggedIn} />);
    });

    it('renders the Profile component', () => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('renders the TweetContainer component', () => {
      expect(screen.getByText('TweetContainer')).toBeInTheDocument();
    });

    it('renders the LogoutButton conmponent', () => {
      screen.debug();
      expect(screen.getByText('LogoutButton')).toBeInTheDocument();
    });
  });
});
