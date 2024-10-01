import { renderButton, screen, fireEvent } from '@tests/helpers';

const name = 'sign-up';
const link = '/signup';
const children = 'Sign up';

describe('Button', () => {
  describe('when the button does not have a link prop', () => {
    beforeEach(() => {
      renderButton({ name, children });
    });

    it('renders the button with the correct name', () => {
      expect(screen.getByLabelText(`${name}-button`)).toHaveAttribute(
        'name',
        name,
      );
    });

    it('renders the button with the correct classes', () => {
      expect(screen.getByLabelText(`${name}-button`)).toHaveClass(
        'border border-black rounded bg-white h-10 w-24 text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200',
      );
    });

    it('renders the button with the correct text', () => {
      expect(screen.getByLabelText(`${name}-button`)).toHaveTextContent(
        children,
      );
    });

    it('does not navigate when clicked', () => {
      fireEvent.click(screen.getByLabelText(`${name}-button`));
      expect(window.location.pathname).toBe('/');
    });
  });

  describe('and the button has a link prop', () => {
    beforeEach(() => {
      renderButton({ name, link, children });
    });

    it('renders the button as a link', () => {
      expect(
        screen.getByLabelText(`${name}-button`).closest('a'),
      ).toHaveAttribute('href', link);
    });

    it('navigates to the correct path when clicked', () => {
      fireEvent.click(screen.getByLabelText(`${name}-button`));
      expect(window.location.pathname).toBe(link);
    });
  });
});
