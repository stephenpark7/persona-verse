import { screen } from '@testing-library/react';
import { jwtFactory, preloadedStateFactory } from '@factories';
import { TweetContainer } from '@components';
import { renderWithRouter } from '@tests/helpers';

describe('TweetContainer component', () => {
  describe('while logged in', () => {
    beforeEach(() => {
      const jwt = jwtFactory();
      const isLoggedIn = false;
      const preloadedState = preloadedStateFactory({
        jwt,
      });
      renderWithRouter(
        <TweetContainer jwt={jwt} isLoggedIn={isLoggedIn} />,
        preloadedState,
      );
    });

    it('renders TweetInput component', () => {
      expect(screen.getByTestId('tweet-input')).toBeInTheDocument();
    });

    it('renders TweetButton component', () => {
      expect(screen.getByTestId('tweet-button')).toBeInTheDocument();
    });

    it('renders Tweets component', () => {
      expect(screen.getByTestId('tweets')).toBeInTheDocument();
    });
  });
});
