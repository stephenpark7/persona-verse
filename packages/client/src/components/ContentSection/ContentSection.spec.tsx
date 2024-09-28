import { useUserStateStub } from '@mocks';
import { beforeEach, describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ContentSection } from '@components';
import { UserType } from '@factories';
import { renderWithProviders } from '@core';
import { renderWithBrowserRouter } from '@tests/helpers';

describe('When rendering the content section', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const { jwt, isLoggedIn } = useUserStateStub(UserType.GUEST)();
      renderWithBrowserRouter(
        <ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />,
      );
    });

    it('displays sign up and log in buttons', () => {
      expect(screen.getByTestId('signup-button')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const { jwt, isLoggedIn } = useUserStateStub(UserType.USER)();
      renderWithProviders(<ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />);
    });

    it('displays the tweet container', () => {
      expect(screen.getByTestId('tweet-container')).toBeInTheDocument();
    });
  });
});
