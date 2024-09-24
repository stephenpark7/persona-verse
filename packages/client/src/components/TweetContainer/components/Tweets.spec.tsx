import {
  jwtFactory,
  preloadedStateFactory,
  // responseFactory,
  tweetFactory,
} from '@factories';
import { screen, waitFor } from '@testing-library/react';
import { renderApp } from '@tests/utils';
import { Tweets } from './Tweets';
import { useGetTweetsQueryStub } from '@mocks';

vi.mock('@components', () => ({
  Tweet: () => <div data-testid="tweet" />,
  Navbar: () => <div data-testid="navbar" />,
}));

// vi.spyOn(axios, 'request').mockReturnValue(
//   Promise.resolve(
//     responseFactory({
//       data: {
//         tweets: [tweetFactory()],
//       },
//     }),
//   ),
// );

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

describe('Rendering tweets', () => {
  beforeEach(() => {
    useGetTweetsQueryStub('loaded');
    renderApp(<Tweets />, preloadedState);
  });

  describe('while loading', () => {
    it('displays loading message', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('after loading', () => {
    it.skip('displays tweets', async () => {
      await waitFor(() => {
        expect(screen.getByTestId('tweet')).toBeInTheDocument();
      });
    });
  });
});
