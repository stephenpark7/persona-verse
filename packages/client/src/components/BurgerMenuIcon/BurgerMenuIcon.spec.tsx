import { render, screen } from '@tests/helpers';
import BurgerMenuIconSvg from '@assets/images/burger-menu-icon.svg';
import { BurgerMenuIcon } from './BurgerMenuIcon';

describe('When rendering the burger menu icon', () => {
  beforeEach(() => {
    render(<BurgerMenuIcon />);
  });

  it('displays the burger menu icon', () => {
    expect(screen.getByTestId('navbar-burger-menu-icon')).toBeInTheDocument();
  });

  it('displays the burger menu icon image with the correct alt text', () => {
    expect(screen.getByTestId('navbar-burger-menu-icon')).toHaveAttribute(
      'alt',
      'Burger menu icon',
    );
  });

  it('displays the burger menu icon image with the correct source', () => {
    expect(screen.getByTestId('navbar-burger-menu-icon')).toHaveAttribute(
      'src',
      BurgerMenuIconSvg,
    );
  });
});
