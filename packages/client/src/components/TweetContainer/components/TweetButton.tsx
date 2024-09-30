import type { FC } from 'react';
import { Button } from '@components';

interface TweetButtonProps {
  onPostTweet: () => void;
}

export const TweetButton: FC<TweetButtonProps> = ({ onPostTweet }) => {
  const handleClickEvent = () => {
    onPostTweet();
  };

  return (
    <Button
      name="tweet"
      overrideCSS="mb-2"
      width="w-20"
      height="h-9"
      onClick={handleClickEvent}
    >
      Tweet
    </Button>
  );
};
