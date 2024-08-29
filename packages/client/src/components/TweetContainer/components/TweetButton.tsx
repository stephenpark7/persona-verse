import React from 'react';
import { toast } from 'react-toastify';
import { useUserState } from '@hooks';
import { usePostTweetMutation } from '@redux';
import { Button } from '@components';


export const TweetButton: React.FC = () => {
  const { jwt, isLoggedIn } = useUserState();

  const [ postTweet ] = usePostTweetMutation();

  const handlePostTweet = async () => {
    if (!isLoggedIn) {
      return;
    }

    const message = textRef.current?.value;

    if (!message || message.length === 0) {
      toast.error('Please enter a message');
      return;
    }

    textRef.current.value = '';

    if (!jwt) {
      return;
    }

    postTweet({ jwt: jwt, payload: { message: message } });
  };

  return (
    <Button
      extraStyles='mb-2'
      onClickEvent={handlePostTweet}
      width='w-20'
      height='h-9'
    >
      Tweet
    </Button>``
  );
};
