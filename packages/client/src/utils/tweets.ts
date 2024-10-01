import { toast } from 'react-toastify';
import type { Jwt } from '@schemas';
import { tweetAPI } from '@redux';

interface handlePostTweet {
  jwt: Jwt | null;
  isLoggedIn: boolean;
  tweetInput: string;
  setTweetInput: React.Dispatch<React.SetStateAction<string>>;
  postTweet: ReturnType<typeof tweetAPI.usePostTweetMutation>[0];
}

export const submitTweet = async ({
  jwt,
  isLoggedIn,
  tweetInput,
  setTweetInput,
  postTweet,
}: handlePostTweet): Promise<void> => {
  if (!tweetInput || tweetInput.length === 0) {
    toast.error('Please enter a message.');
    return;
  }

  setTweetInput('');

  if (!jwt || !isLoggedIn) {
    toast.error('Please login to post a tweet.');
    return;
  }

  postTweet({
    jwt,
    payload: {
      message: tweetInput,
    },
  });
};
