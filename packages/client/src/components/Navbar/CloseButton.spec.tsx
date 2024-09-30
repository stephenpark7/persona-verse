import { renderWithRouter, screen } from '@tests/helpers';
import { CloseButton } from './CloseButton';

const closeBurgerMenu = vi.fn();

describe('CloseButton', () => {
  beforeEach(() => {
    renderWithRouter(<CloseButton closeBurgerMenu={closeBurgerMenu} />);
  });

  it('renders the close button', () => {
    expect(screen.getByTestId('navbar-close-button')).toBeInTheDocument();
  });

  it('calls closeBurgerMenu when clicked', () => {
    screen.getByTestId('navbar-close-button').click();
    expect(closeBurgerMenu).toHaveBeenCalled();
  });
});
