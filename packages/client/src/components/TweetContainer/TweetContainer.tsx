import { FC, JSX, useState } from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';
import { submitTweet } from '@utils';
import { usePostTweetMutation } from '@redux';
import { JWT } from '@shared';

interface TweetContainerProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
}

export const TweetContainer: FC<TweetContainerProps> = ({
  jwt,
  isLoggedIn,
}): JSX.Element => {
  const tweetInputState = useState<string>('');

  const [postTweet] = usePostTweetMutation();

  const [tweetInput, setTweetInput] = tweetInputState;

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
    <div>
      <TweetInput
        state={tweetInputState}
        onPostTweet={handlePostTweet}
      />
      <TweetButton onPostTweet={handlePostTweet} />
      <Tweets />
    </div>
  );
};
