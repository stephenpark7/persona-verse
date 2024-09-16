import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';
import { screen, waitFor } from '@testing-library/react';
import { renderApp } from '@tests/utils';
import { Tweets } from './Tweets';

describe('When rendering tweets', () => {
  describe('while loading', () => {
    beforeEach(() => {
      renderApp(
        <Tweets />,
        preloadedStateFactory({
          user: {
            value: {
              jwt: jwtFactory(),
              tweets: [tweetFactory()],
            },
          },
        }),
      );
    });

    it('displays loading message', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('eventually displays tweets', async () => {
      await waitFor(() =>
        expect(screen.getByText('tweet_0')).toBeInTheDocument(),
      );
    });
  });

  describe('while loaded', () => {
    beforeEach(() => {
      renderApp(
        <Tweets />,
        preloadedStateFactory({
          user: {
            value: {
              jwt: jwtFactory(),
              tweets: [tweetFactory()],
            },
          },
        }),
      );
    });

    it('displays tweets', async () => {
      await waitFor(() =>
        expect(screen.getByText('tweet_0')).toBeInTheDocument(),
      );
    });
  });
});
