import { screen, renderWithRouter } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
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
});

// TODO: redirect to dashboard if user is logged in
