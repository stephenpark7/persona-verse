import { renderWithRouter, screen, fireEvent } from '@tests/helpers';
import { preloadedStateFactory } from '@tests/factories';
import { logout } from '@services';
import { LogoutButton } from '@components';

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
