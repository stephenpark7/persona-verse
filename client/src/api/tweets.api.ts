import { toast } from 'react-toastify';
import { SetTweetData, JsonResponse, PostTweet } from '../interfaces/api';
import { apiCall } from './';

async function getTweets(
  setTweetData: SetTweetData,
): Promise<void> {
  const responseData: JsonResponse = await apiCall({
    method: 'GET',
    controller: 'tweets',
    action: 'get',
  });

  const { tweets } = responseData;

  if (!tweets) {
    throw new Error('getTweets failed.');
  }

  setTweetData(tweets);
}

async function postTweet({
  jwt,
  payload,
  tweetData,
  setTweetData,
}: PostTweet): Promise<void> {
  if (!jwt) {
    throw new Error('jwt argument is missing.');
  }

  const responseData = await apiCall({
    method: 'POST',
    controller: 'tweets',
    action: 'create',
    body: payload,
  });

  const { tweet } = responseData;

  if (!tweet) {
    throw new Error('postTweet failed.');
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
