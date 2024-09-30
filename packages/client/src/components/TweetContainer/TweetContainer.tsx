import { type FC, JSX, useState } from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';
import { submitTweet } from '@utils';
import { usePostTweetMutation } from '@redux';
import type { TweetContainerProps } from '@types';

export const TweetContainer: FC<TweetContainerProps> = ({
  jwt,
  isLoggedIn,
}): JSX.Element => {
  const tweetInputState = useState<string>('');
  const [tweetInput, setTweetInput] = tweetInputState;
  const [postTweet] = usePostTweetMutation();

  const handlePostTweet = () => {
    submitTweet({
      isLoggedIn,
      jwt,
      tweetInput,
      setTweetInput,
      postTweet,
    });
  };

  return (
    <div data-testid="tweet-container">
      <div className="mb-2">
        <TweetInput
          state={tweetInputState}
          onPostTweet={handlePostTweet}
        />
        <TweetButton onPostTweet={handlePostTweet} />
      </div>
      <Tweets />
    </div>
  );
};
