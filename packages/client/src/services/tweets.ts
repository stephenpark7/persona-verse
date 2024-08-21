import { PostTweet, TweetData } from '@interfaces';
import { store, addTweet, setTweets } from '@redux';
import { apiCall } from '.';

export const getTweets = async (): Promise<TweetData[]> => {
  const response = await apiCall({
    method: 'GET',
    controller: 'tweets',
    action: 'get',
  }, false, 'rest');

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
}: PostTweet): Promise<void> => {
  if (!jwt) {
    throw new Error('Failed to post tweet.');
  }

  const response = await apiCall({
    method: 'POST',
    controller: 'tweets',
    action: 'create',
    body: payload,
  }, true, 'rest');

  if (!response || !response.tweet) return;

  response.tweet.User = {
    username: jwt.payload.username,
  };

  store.dispatch(addTweet(response.tweet));
};
