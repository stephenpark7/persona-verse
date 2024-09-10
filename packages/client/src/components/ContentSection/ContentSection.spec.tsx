import { useUserStateStub } from '@mocks';
import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentSection } from '@components';
import { UserType } from '@factories';
import { renderWithProviders } from '@core';

vi.mock('@components', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@components')>()),
    Profile: () => <div>Profile</div>,
    TweetContainer: () => <div>TweetContainer</div>,
    LogoutButton: () => <div>LogoutButton</div>,
    Buttons: () => (
      <div>
        <button>Sign up</button>
        <button>Log in</button>
      </div>
    ),
    ContentSection: () => (
      <div>
        <div>Profile</div>
        <div>TweetContainer</div>
        <div>LogoutButton</div>
        <div>
          <button>Sign up</button>
          <button>Log in</button>
        </div>
      </div>
    ),
  };
});

describe('When rendering the content section', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const useUserState = useUserStateStub(UserType.GUEST);
      const { jwt, isLoggedIn } = useUserState();
      render(<ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />);
    });

    it('displays sign up and log in buttons', () => {
      expect(screen.getByText('Sign up')).toBeInTheDocument();
      expect(screen.getByText('Log in')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const useUserState = useUserStateStub(UserType.USER);
      const { jwt, isLoggedIn } = useUserState();
      renderWithProviders(<ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />);
    });

    it('displays the profile', () => {
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
