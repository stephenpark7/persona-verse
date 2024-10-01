import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '@tests/helpers';
import { Tweets } from './Tweets';

const jwt = jwtFactory();
const tweets = [tweetFactory()];
const preloadedState = preloadedStateFactory({
  user: {
    value: {
      jwt,
      tweets,
    },
  },
});

vi.mock('@components', () => ({
  Tweet: () => <div data-testid="tweet" />,
  Navbar: () => <div data-testid="navbar" />,
}));

vi.mock('@services', () => ({
  getTweets: async () => tweets,
}));

describe('Rendering tweets', () => {
  beforeEach(() => {
    renderWithRouter(<Tweets />, preloadedState);
  });

  describe('while loading', () => {
    it('displays loading message', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('after loading', () => {
    it('displays tweets', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('tweet')).toBeInTheDocument();
      });
    });
  });
});
