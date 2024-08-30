import React, { FC, JSX, useState } from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';
import { submitTweet } from '@utils';
import { useUserState } from '@hooks';
import { usePostTweetMutation } from '@redux';

export const TweetContainer: FC = (): JSX.Element => {
  const inputTextState = useState<string>('');

  const { isLoggedIn, jwt } = useUserState();

  const [ postTweet ] = usePostTweetMutation();

  const [ tweetInput, setTweetInput ] = inputTextState;

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
      <TweetButton 
        onPostTweet={handlePostTweet}
      />
      <Tweets />
    </div>
  );
};
