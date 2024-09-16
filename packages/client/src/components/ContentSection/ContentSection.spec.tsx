import { useUserStateStub } from '@mocks';
import { beforeEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentSection } from '@components';
import { UserType } from '@factories';
import { renderWithProviders } from '@core';

vi.mock('@components', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@components')>()),
    Profile: () => <div data-testid="profile">Profile</div>,
    TweetContainer: () => (
      <div data-testid="tweet-container">TweetContainer</div>
    ),
    LogoutButton: () => <div data-testid="logout-button">LogoutButton</div>,
    Buttons: () => (
      <div data-testid="buttons">
        <button data-testid="sign-up">Sign up</button>
        <button data-testid="log-in">Log in</button>
      </div>
    ),
    ContentSection: () => (
      <div data-testid="content-section">
        <div data-testid="profile">Profile</div>
        <div data-testid="tweet-container">TweetContainer</div>
        <div data-testid="logout-button">LogoutButton</div>
        <div data-testid="buttons">
          <button data-testid="sign-up">Sign up</button>
          <button data-testid="log-in">Log in</button>
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
      expect(screen.getByTestId('sign-up')).toBeInTheDocument();
      expect(screen.getByTestId('log-in')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const useUserState = useUserStateStub(UserType.USER);
      const { jwt, isLoggedIn } = useUserState();
      renderWithProviders(<ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />);
    });

    it('displays the profile', () => {
      expect(screen.getByTestId('profile')).toBeInTheDocument();
    });

    it('renders the TweetContainer component', () => {
      expect(screen.getByTestId('tweet-container')).toBeInTheDocument();
    });

    it('renders the LogoutButton component', () => {
      screen.debug();
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });
  });
});
