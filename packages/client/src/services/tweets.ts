import { PostTweetData, TweetData } from 'src/schemas';
import { store, addTweet, setTweets } from '@redux';
import { apiCall } from '.';

export const getTweets = async (): Promise<TweetData[]> => {
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
}: PostTweetData): Promise<TweetData> => {
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
