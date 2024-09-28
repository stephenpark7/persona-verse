import { screen, renderApp } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';

const jwt = jwtFactory();
const tweets = [tweetFactory()];
const preloadedState = preloadedStateFactory({
  user: {
    value: {
      jwt,
      tweets,
    },
  },
});

describe('When rendering the router', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      renderApp();
    });

    it('renders home page by default', () => {
      expect(screen.getByTestId('header')).toHaveTextContent('PersonaVerse');
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      renderApp(undefined, preloadedState);
    });

    it('redirects to dashboard', async () => {
      expect(screen.getByTestId('paragraph')).toHaveTextContent(
        'Redirecting...',
      );
    });
  });
});
