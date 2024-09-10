import { PostTweet, Tweet } from '@schemas';
import { store, addTweet, setTweets } from '@redux';
import { apiCall } from '.';

export const getTweets = async (): Promise<Tweet[]> => {
  const response = await apiCall(
    {
      method: 'GET',
      controller: 'tweets',
      action: 'get',
    },
    false,
    'rest',
  );

  if (!response) return [];

  if (!response.tweets) {
    throw new Error('Failed to retrieve tweets.');
  }

  store.dispatch(setTweets(response.tweets));

  return response.tweets;
};

export const postTweet = async ({
  jwt,
  payload,
}: PostTweet): Promise<Tweet> => {
  if (!jwt) {
    throw new Error('Failed to post tweet.');
  }

  const response = await apiCall(
    {
      method: 'POST',
      controller: 'tweets',
      action: 'create',
      body: payload,
    },
    true,
    'rest',
  );

  if (!response || !response.tweet) {
    throw new Error('Failed to post tweet.');
  }

  response.tweet.User = {
    username: jwt.payload.username,
  };

  store.dispatch(addTweet(response.tweet));

  return response.tweet;
};
