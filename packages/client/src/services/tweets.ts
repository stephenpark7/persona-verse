import { Jwt } from '@schemas';
import { Tweet } from '@schemas';
import { store, addTweet, setTweets } from '@redux';
import { apiCall } from '.';
import { createTweet, getTweets as trpcGetTweets } from 'src/trpc';

export const postTweet = async ({
  jwt,
  payload,
}: {
  jwt: Jwt;
  payload: { message: string };
}): Promise<Tweet> => {
  if (!jwt) {
    throw new Error('Failed to post tweet.');
  }

  const response = await apiCall({
    params: {
      method: 'POST',
      controller: 'tweets',
      action: () => createTweet({ message: payload.message }),
    },
    showToast: true,
    protocol: 'trpc',
  });

  if (!response || !response.tweet) {
    throw new Error('Failed to post tweet.');
  }

  response.tweet.User = {
    username: jwt.payload.username,
  };

  store.dispatch(addTweet(response.tweet));

  return response.tweet;
};

export const getTweets = async (): Promise<Tweet[] | null> => {
  const response = await apiCall({
    params: {
      method: 'GET',
      controller: 'tweets',
      action: trpcGetTweets,
    },
    showToast: false,
    protocol: 'trpc',
  });

  if (!response) return null;

  if (!response.tweets) {
    throw new Error('Failed to retrieve tweets.');
  }

  store.dispatch(setTweets(response.tweets));

  return response.tweets;
};
