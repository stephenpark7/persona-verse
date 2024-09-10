import { FC, JSX, useState } from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';
import { submitTweet } from '@utils';
import { usePostTweetMutation } from '@redux';
import { JWT } from '@shared';
import { Profile } from '../Profile';

interface TweetContainerProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
}

export const TweetContainer: FC<TweetContainerProps> = ({
  jwt,
  isLoggedIn,
}): JSX.Element => {
  const inputTextState = useState<string>('');

  const [postTweet] = usePostTweetMutation();

  const [tweetInput, setTweetInput] = inputTextState;

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
        state={inputTextState}
        onPostTweet={handlePostTweet}
      />
      <TweetButton onPostTweet={handlePostTweet} />
      <Tweets />
    </div>
  );
};
