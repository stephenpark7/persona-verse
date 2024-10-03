import { screen, waitFor, renderWithRouter } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';
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

vi.mock('@services', () => ({
  getTweets: async () => tweets,
}));

describe('Tweets', () => {
  beforeEach(() => {
    renderWithRouter(<Tweets />, preloadedState);
  });

  it('renders the component', () => {
    expect(screen.getByTestId('tweets')).toBeInTheDocument();
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
