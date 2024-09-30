import { renderWithRouter, screen } from '@tests/helpers';
import { BurgerMenu } from './BurgerMenu';

const setIsBurgerMenuOpen = vi.fn();

describe('When rendering the burger menu', () => {
  beforeEach(() => {
    renderWithRouter(<BurgerMenu setIsBurgerMenuOpen={setIsBurgerMenuOpen} />);
  });

  it('renders the burger menu icon', () => {
    expect(screen.getByTestId('burger-menu-icon')).toBeInTheDocument();
  });

  describe('when clicking the burger menu icon', () => {
    beforeEach(() => {
      screen.getByTestId('burger-menu-icon').click();
    });

    it('calls setIsBurgerMenuOpen with true', () => {
      expect(setIsBurgerMenuOpen).toHaveBeenCalledWith(true);
    });
  });
});
