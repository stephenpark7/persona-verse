import { renderWithRouter, screen } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory } from '@tests/factories';
import { ContentSection } from '@components';

describe('When rendering the content section', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const jwt = jwtFactory();
      const isLoggedIn = false;
      const preloadedState = preloadedStateFactory({
        jwt: null,
        tweets: null,
      });

      renderWithRouter(
        <ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />,
        preloadedState,
      );
    });

    it('displays the content section', () => {
      expect(screen.getByTestId('content-section')).toBeInTheDocument();
    });

    it('displays buttons', () => {
      expect(screen.getByTestId('buttons')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const isLoggedIn = true;
      const preloadedState = preloadedStateFactory();
      const { user } = preloadedState;
      const jwt = user?.value.jwt || null;

      renderWithRouter(
        <ContentSection jwt={jwt} isLoggedIn={isLoggedIn} />,
        preloadedState,
      );
    });

    it('displays the tweet container', () => {
      expect(screen.getByTestId('tweet-container')).toBeInTheDocument();
    });
  });
});
