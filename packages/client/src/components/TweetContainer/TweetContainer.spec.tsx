import { screen, fireEvent, renderWithRouter } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory } from '@factories';
import * as utils from '@utils';
import { TweetContainer } from '@components';

const submitTweetSpy = vi.spyOn(utils, 'submitTweet');

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

    describe('when the tweet button is clicked', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByTestId('tweet-button'));
      });

      it('calls handlePostTweet', () => {
        expect(submitTweetSpy).toHaveBeenCalled();
      });
    });
  });
});
