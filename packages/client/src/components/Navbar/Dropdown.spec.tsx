import { renderWithRouter, screen } from '@tests/helpers';
import { Dropdown } from './Dropdown';

const closeBurgerMenu = vi.fn();

describe('Dropdown', () => {
  beforeEach(() => {
    renderWithRouter(<Dropdown closeBurgerMenu={closeBurgerMenu} />);
  });

  it('renders the dropdown', () => {
    expect(screen.getByTestId('navbar-dropdown')).toBeInTheDocument();
  });

  it('renders a link to the dashboard', () => {
    expect(
      screen.getByLabelText('navbar-dropdown-dashboard-link'),
    ).toHaveAttribute('href', '/');
  });

  it('renders a link to the profile', () => {
    expect(
      screen.getByLabelText('navbar-dropdown-profile-link'),
    ).toHaveAttribute('href', '/profile');
  });

  it('renders a logout button', () => {
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('renders a close button', () => {
    expect(screen.getByTestId('navbar-close-button')).toBeInTheDocument();
  });
});
