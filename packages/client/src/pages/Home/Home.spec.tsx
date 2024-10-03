import { screen } from '@testing-library/react';
import { renderWithRouter } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
import { Home } from '@pages';

describe('Home', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory({
        jwt: null,
        tweets: null,
      });

      renderWithRouter(<Home />, preloadedState);
    });

    it('renders home component', () => {
      expect(screen.getByTestId('home')).toBeInTheDocument();
    });

    it('renders header component', () => {
      expect(screen.getByLabelText('header')).toBeInTheDocument();
    });

    it('renders WelcomeMessage component', () => {
      expect(screen.getByLabelText('welcome-message')).toBeInTheDocument();
    });

    it('renders ContentSection component', () => {
      expect(screen.getByTestId('content-section')).toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory();

      renderWithRouter(<Home />, preloadedState);
    });

    it('does not render home component', () => {
      expect(screen.queryByTestId('home')).not.toBeInTheDocument();
    });
  });
});
