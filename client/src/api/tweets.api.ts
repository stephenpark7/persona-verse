import { toast } from 'react-toastify';
import {
  TweetData,
  JWT,
} from '../interfaces';
import { apiCall, handleError } from './';
import { SetTweetData, JsonResponse, PostTweet } from '../interfaces/api';

async function getTweets(
  setTweetData: SetTweetData,
): Promise<void> {
  const responseData: JsonResponse = await apiCall({
    method: 'GET',
    controller: 'tweets',
    action: 'get',
  });

  if (!responseData.tweets) {
    throw new Error('Tweet data is missing.');
  }

  setTweetData(responseData.tweets);
}

async function postTweet({
  userData,
  payload,
  tweetData,
  setTweetData,
}: PostTweet): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const responseData = await apiCall({
      method: 'POST',
      controller: 'tweets',
      action: 'create',
      body: payload,
    });

    function addUserDataToTweet(
      responseData: JsonResponse,
      userParams: JWT,
    ): TweetData {
      const { tweet } = responseData;

      if (!tweet) {
        throw new Error('Tweet data is missing.');
      }

      tweet.User = {
        username: userParams!.payload.username,
        displayName: userParams!.payload.displayName ? userParams!.payload.displayName : userParams!.payload.username,
      };

      return tweet;
    }

    const enrichedData = addUserDataToTweet(responseData, userData);
    setTweetData([ enrichedData, ...tweetData! ]);
    toast.success('Tweet posted.');
  }
  catch (err: unknown) {
    handleError(err);
  }
}

export {
  getTweets,
  postTweet,
};
