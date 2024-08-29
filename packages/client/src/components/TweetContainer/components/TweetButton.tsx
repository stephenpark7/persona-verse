import React from 'react';
import { toast } from 'react-toastify';
import { useUserState } from '@hooks';
import { usePostTweetMutation } from '@redux';
import { Button } from '@components';

interface TweetButtonProps {
  tweetInput: string;
  setTweetInput: React.Dispatch<React.SetStateAction<string>>;
}

export const TweetButton: React.FC<TweetButtonProps> = ( { tweetInput, setTweetInput } ) => {
  const { jwt, isLoggedIn } = useUserState();

  const [ postTweet ] = usePostTweetMutation();

  const handlePostTweet = async () => {
    if (!isLoggedIn) {
      return;
    }

    const message = tweetInput;

    if (!message || message.length === 0) {
      toast.error('Please enter a message');
      return;
    }

    setTweetInput('');

    if (!jwt) {
      toast.error('Please login to post a tweet');
      return;
    }

    postTweet({ 
      jwt, 
      payload: { 
        message, 
      }, 
    });
  };

  return (
    <Button
      extraStyles='mb-2'
      onClickEvent={handlePostTweet}
      width='w-20'
      height='h-9'
    >
      Tweet
    </Button>
  );
};
