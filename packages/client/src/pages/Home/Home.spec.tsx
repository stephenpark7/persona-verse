import { screen } from '@testing-library/react';
import { renderWithRouter } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
import { Home } from '@pages';

describe('When rendering the home page', () => {
  describe('while logged in', () => {
    beforeEach(() => {
      renderWithRouter(<Home />, preloadedStateFactory());
    });

    it.skip('renders header component', () => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it.skip('renders WelcomeMessage component', () => {
      expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
    });

    it.skip('renders ContentSection component', () => {
      expect(screen.getByTestId('content-section')).toBeInTheDocument();
    });
  });
});
