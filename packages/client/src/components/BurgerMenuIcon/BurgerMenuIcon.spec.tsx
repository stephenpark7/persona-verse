import { render, screen } from '@tests/helpers';
import { BurgerMenuIcon } from './BurgerMenuIcon';

describe('When rendering the burger menu icon', () => {
  beforeEach(() => {
    render(<BurgerMenuIcon />);
  });

  it('displays the burger menu icon', () => {
    expect(screen.getByTestId('burger-menu-icon')).toBeInTheDocument();
  });
});
