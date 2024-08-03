import { toast } from 'react-toastify';
import { JsonResponse, PostTweet, TweetData } from '../interfaces/api';
import { apiCall } from './';
import { setTweets, store } from '../../src/stores';

async function getTweets(
): Promise<TweetData[]> {
  const responseData: JsonResponse = await apiCall({
    method: 'GET',
    controller: 'tweets',
    action: 'get',
  });

  const { tweets } = responseData;

  if (!tweets) {
    throw new Error('Failed to retrieve tweets.');
  }

  store.dispatch(setTweets(tweets));
  
  return tweets;
}

async function postTweet({
  jwt,
  payload,
}: PostTweet): Promise<void> {
  if (!jwt) {
    throw new Error('Failed to post tweet.');
  }

  const responseData = await apiCall({
    method: 'POST',
    controller: 'tweets',
    action: 'create',
    body: payload,
  });

  const { tweet } = responseData;

  if (!tweet) {
    throw new Error('Failed to post tweet.');
  }

  tweet.User = {
    username: jwt.payload.username,
    displayName: jwt.payload.displayName ? jwt.payload.displayName : jwt.payload.username,
  };

  const tweets = store.getState().user.value.tweets;

  if (!tweets) {
    throw new Error('Failed to post tweet.');
  }

  store.dispatch(setTweets([ tweet, ...tweets ]));

  toast.success(responseData.message);
}

export {
  getTweets,
  postTweet,
};
