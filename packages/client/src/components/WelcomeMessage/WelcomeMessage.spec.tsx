import { renderWithRouter, screen } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory } from '@tests/factories';
import { WelcomeMessage } from '@components';

const jwt = jwtFactory();
const isLoggedIn = false;
const preloadedState = preloadedStateFactory({
  jwt,
});

describe('When rendering the welcome message', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      renderWithRouter(
        <WelcomeMessage jwt={jwt} isLoggedIn={isLoggedIn} />,
        preloadedState,
      );
    });

    it('displays a prompt to create an account or log in', () => {
      expect(screen.getByLabelText('welcome-message')).toHaveTextContent(
        'Create an account or log in.',
      );
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const jwt = jwtFactory();
      const isLoggedIn = true;
      const preloadedState = preloadedStateFactory({
        jwt,
      });
      renderWithRouter(
        <WelcomeMessage jwt={jwt} isLoggedIn={isLoggedIn} />,
        preloadedState,
      );
    });

    it('displays a welcome message', () => {
      expect(screen.getByLabelText('welcome-message')).toHaveTextContent(
        'Welcome john-doe!',
      );
    });
  });
});
