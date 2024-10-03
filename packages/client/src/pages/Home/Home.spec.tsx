import { screen } from '@testing-library/react';
import { renderWithRouter } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
import { Home } from '@pages';

describe('When rendering the home page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const preloadedState = preloadedStateFactory({
        jwt: null,
        tweets: null,
      });

      renderWithRouter(<Home />, preloadedState);
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
});
