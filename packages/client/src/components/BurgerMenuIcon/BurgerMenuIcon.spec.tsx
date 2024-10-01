import { render, screen } from '@tests/helpers';
import BurgerMenuIconSvg from '@assets/images/burger-menu-icon.svg';
import { BurgerMenuIcon } from './BurgerMenuIcon';

describe('BurgerMenuIcon', () => {
  beforeEach(() => {
    render(<BurgerMenuIcon />);
  });

  it('renders the burger menu icon image', () => {
    expect(
      screen.getByRole('img', { name: 'Burger menu icon' }),
    ).toBeInTheDocument();
  });

  it('renders the burger menu icon image with the correct alt text', () => {
    expect(
      screen.getByRole('img', { name: 'Burger menu icon' }),
    ).toHaveAttribute('alt', 'Burger menu icon');
  });

  it('renders the burger menu icon image with the correct src', () => {
    expect(
      screen.getByRole('img', { name: 'Burger menu icon' }),
    ).toHaveAttribute('src', BurgerMenuIconSvg);
  });
});
