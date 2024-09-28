import { renderWithBrowserRouter } from '@helpers';
import { BurgerMenuIcon } from './BurgerMenuIcon';
import { screen } from '@helpers';

describe('When rendering the burger menu icon', () => {
  beforeEach(() => {
    renderWithBrowserRouter(<BurgerMenuIcon />);
  });

  it('displays the burger menu icon', () => {
    expect(screen.getByTestId('burger-menu-icon')).toBeInTheDocument();
  });
});
