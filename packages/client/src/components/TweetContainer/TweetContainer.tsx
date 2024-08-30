import React, { FC, JSX, useState } from 'react';
import { TweetInput } from './components/TweetInput';
import { Tweets } from './components/Tweets';
import { TweetButton } from './components/TweetButton';

export const TweetContainer: FC = (): JSX.Element => {
  const tweetInputState = useState<string>('');

  return (
    <div>
      <TweetInput tweetInputState={tweetInputState} />
      <TweetButton tweetInputState={tweetInputState} />
      <Tweets />
    </div>
  );
};
