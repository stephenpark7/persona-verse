import React from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';

export const TweetContainer: React.FC = (): React.JSX.Element => {
  return (
    <div>
      <TweetInput />
      <Tweets  />
    </div>
  );
};
