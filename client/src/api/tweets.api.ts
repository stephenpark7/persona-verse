import { toast } from 'react-toastify';
import {
  TweetParams,
  JWT,
} from '../interfaces';
import { apiCall, handleError } from './';
import { GetTweets, JsonResponse, PostTweet } from '../interfaces/api';

async function getTweets({
  userData,
  setTweetData,
}: GetTweets): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const responseData = await apiCall({
      method: 'GET',
      controller: 'tweets',
      action: 'get',
      body: null,
      options: {},
    });

    setTweetData(responseData.tweets);
  }
  catch (err: unknown) {
    handleError(err);
  }
}

// Refactor to use fetch intercept
// instead of passing in JWT`
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
      options: {},
      headers: {
        'Authorization': `Bearer ${userData.token}`,
      },
    });

    function addUserDataToTweet(
      responseData: JsonResponse,
      userParams: JWT,
    ): TweetParams {
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