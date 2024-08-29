import React, { FC, JSX, useState } from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';

export const TweetContainer: FC = (): JSX.Element => {
  const [ 
    tweetInput, 
    setTweetInput, 
  ] = useState<string>('');

  return (
    <div>
      <TweetInput
        inputRef={{ tweetInput, setTweetInput }}
      />
      <TweetButton
        inputRef={{ tweetInput, setTweetInput }}
      />
      <Tweets  />
    </div>
  );
};
