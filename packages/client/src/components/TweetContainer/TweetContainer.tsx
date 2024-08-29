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
        tweetInput={tweetInput} 
        setTweetInput={setTweetInput}
      />
      <TweetButton
        tweetInput={tweetInput}
        setTweetInput={setTweetInput}
      />
      <Tweets  />
    </div>
  );
};
