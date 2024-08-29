import React from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';

export const TweetContainer: React.FC = (): React.JSX.Element => {
  return (
    <div>
      <TweetInput />
      <TweetButton />
      <Tweets  />
    </div>
  );
};
