import { toast } from 'react-toastify';
import type { JWT } from '@shared';
import { tweetAPI } from '@redux';

interface handlePostTweetProps {
  isLoggedIn: boolean;
  jwt: JWT | null;
  tweetInput: string;
  setTweetInput: React.Dispatch<React.SetStateAction<string>>;
  postTweet: ReturnType<typeof tweetAPI.usePostTweetMutation>[0];
}

export const submitTweet = async ({
  isLoggedIn,
  jwt,
  tweetInput,
  setTweetInput,
  postTweet,
}: handlePostTweetProps): Promise<void> => {
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
