import { Link } from 'react-router-dom';
import { renderWithRouter, screen } from '@tests/helpers';
import { Item } from './Item';

describe('Item', () => {
  beforeEach(() => {
    renderWithRouter(
      <Item>
        <Link data-testid="navbar-dropdown-test-link" to="/test">
          Test
        </Link>
      </Item>,
    );
  });

  it('renders the item', () => {
    expect(screen.getByTestId('navbar-dropdown-item')).toBeInTheDocument();
  });

  it('renders a link', () => {
    expect(screen.getByTestId('navbar-dropdown-test-link')).toHaveAttribute(
      'href',
      '/test',
    );
  });
});
