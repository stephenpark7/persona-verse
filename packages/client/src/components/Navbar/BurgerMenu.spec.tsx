import { renderWithRouter, screen } from '@tests/helpers';
import { BurgerMenu } from './BurgerMenu';

const setIsBurgerMenuOpen = vi.fn();

describe('BurgerMenu', () => {
  beforeEach(() => {
    renderWithRouter(<BurgerMenu setIsBurgerMenuOpen={setIsBurgerMenuOpen} />);
  });

  it('renders the burger menu', () => {
    expect(screen.getByTestId('navbar-burger-menu')).toBeInTheDocument();
  });

  it('renders the burger menu icon', () => {
    expect(
      screen.getByRole('img', { name: 'Burger menu icon' }),
    ).toBeInTheDocument();
  });

  describe('when clicking the burger menu icon', () => {
    beforeEach(() => {
      screen.getByRole('img', { name: 'Burger menu icon' }).click();
    });

    it('calls setIsBurgerMenuOpen with true', () => {
      expect(setIsBurgerMenuOpen).toHaveBeenCalledWith(true);
    });
  });
});
