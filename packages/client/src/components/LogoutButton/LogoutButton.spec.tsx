import { renderWithRouter, screen, fireEvent } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
import { LogoutButton } from '@components';
import { logout } from '@services';

vi.mock('@services', () => ({
  logout: vi.fn(),
}));

describe('When rendering the logout button', () => {
  describe('while logged in', () => {
    beforeEach(() => {
      renderWithRouter(<LogoutButton />, preloadedStateFactory());
    });

    it('renders the logout button', () => {
      expect(screen.getByTestId('logout-button')).toBeInTheDocument();
    });

    it('calls the logout function when clicked', () => {
      fireEvent.click(screen.getByText('Log out'));
      expect(logout).toHaveBeenCalled();
    });
  });
});
