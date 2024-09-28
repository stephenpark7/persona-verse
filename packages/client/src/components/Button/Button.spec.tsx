import { Button } from '@components';
import { fireEvent, renderWithBrowserRouter, screen } from '@tests/helpers';

describe('When rendering the button component', () => {
  describe('and the button has a link prop', () => {
    beforeEach(() => {
      renderWithBrowserRouter(
        <Button name="sign-up" link="/signup">
          Sign up
        </Button>,
      );
    });

    it('renders the button with the correct text', () => {
      expect(screen.getByTestId('sign-up-button')).toHaveTextContent('Sign up');
    });

    it('navigates to the correct path when clicked', () => {
      fireEvent.click(screen.getByTestId('sign-up-button'));
      expect(window.location.pathname).toBe('/signup');
    });
  });
});
