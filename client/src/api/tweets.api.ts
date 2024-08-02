import { toast } from 'react-toastify';
import { SetTweetData, JsonResponse, PostTweet, TweetData } from '../interfaces/api';
import { apiCall } from './';

async function getTweets(
  setTweetData?: SetTweetData,
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

  if (setTweetData) setTweetData(tweets);
  
  return tweets;
}

async function postTweet({
  jwt,
  payload,
  tweetData,
  setTweetData,
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

  setTweetData([ tweet, ...tweetData ]);

  toast.success(responseData.message);
}

export {
  getTweets,
  postTweet,
};
