import { screen, waitFor, renderWithRouter } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory } from '@tests/factories';
import { APP_TITLE } from '@utils';
import { Signup } from '@pages';

describe('Signup page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      renderWithRouter(<Signup />);
    });

    it('renders signup component', () => {
      expect(screen.getByTestId('signup')).toBeInTheDocument();
    });

    it.skip('has correct title', () => {
      waitFor(() => expect(document.title).toBe(`${APP_TITLE} - Sign up`));
    });

    it('renders h1', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Sign up',
      );
    });

    it('renders input fields', () => {
      expect(
        screen.getByRole('textbox', { name: 'Username' }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Email' }),
      ).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('renders submit button', () => {
      expect(
        screen.getByRole('button', { name: 'form-signup-button' }),
      ).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const jwt = jwtFactory();
      const preloadedState = preloadedStateFactory({
        jwt,
      });
      renderWithRouter(<Signup />, preloadedState);
    });

    it('redirects to home page', () => {
      waitFor(() => expect(window.location.pathname).toBe('/'));
    });
  });
});
