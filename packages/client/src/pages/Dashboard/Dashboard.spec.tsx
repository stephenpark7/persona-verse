import { renderWithRouter, screen } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  describe('when user is not logged in', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory({
        jwt: null,
        tweets: null,
      });

      renderWithRouter(<Dashboard />, preloadedState);
    });

    it('does not render the dashboard', () => {
      expect(screen.queryByTestId('dashboard')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory();

      renderWithRouter(<Dashboard />, preloadedState);
    });

    it('renders the dashboard', () => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });

    it('renders the header', () => {
      expect(screen.getByLabelText('header')).toBeInTheDocument();
    });

    it('renders the welcome message', () => {
      expect(screen.getByLabelText('welcome-message')).toBeInTheDocument();
    });

    it('renders the content section', () => {
      expect(screen.getByTestId('content-section')).toBeInTheDocument();
    });
  });
});
