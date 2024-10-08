import { screen, renderWithRouter, waitFor } from '@tests/helpers';
import { preloadedStateFactory } from '@tests/factories';
import { APP_TITLE } from '@utils';
import { Login } from '@pages';

describe('Login', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory({
        jwt: null,
        tweets: null,
      });

      renderWithRouter(<Login />, preloadedState);
    });

    it('renders login component', () => {
      expect(screen.getByTestId('login')).toBeInTheDocument();
    });

    // waitFor not working
    it.skip('has correct title', () => {
      waitFor(() => expect(document.title).toBe(`${APP_TITLE} - Log in`));
    });

    it('renders header component', () => {
      expect(screen.getByLabelText('header')).toBeInTheDocument();
    });

    it('renders form component', () => {
      expect(screen.getByLabelText('form')).toBeInTheDocument();
    });

    it('renders button component', () => {
      expect(screen.getByLabelText('go-back-button')).toBeInTheDocument();
    });

    it('renders link component', () => {
      expect(screen.getByLabelText('signup-link')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory();

      renderWithRouter(<Login />, preloadedState);
    });

    it('redirects to home page', () => {
      waitFor(() => expect(window.location.pathname).toBe('/'));
    });
  });
});
