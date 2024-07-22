import { toast } from 'react-toastify';
import {
  TweetPostParams,
  TweetParams,
  UserData,
  UserParams,
  HTTPResponse,
} from '../interfaces';
import { apiCall, handleError } from './index';

async function getTweets(
  userData: UserData,
  setTweetData: React.Dispatch<React.SetStateAction<TweetParams[]>>,
): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const responseData = await apiCall('GET', 'tweets', 'get', null, {}, {
      'Authorization': `Bearer ${userData.token}`,
    });

    setTweetData(responseData.tweets);
  }
  catch (err: unknown) {
    handleError(err);
  }
}

async function postTweet(
  userData: UserData,
  payload: TweetPostParams,
  tweetData: TweetParams[],
  setTweetData: React.Dispatch<React.SetStateAction<TweetParams[]>>,
): Promise<void> {
  try {
    if (!userData) {
      throw new Error('User data is missing.');
    }

    const responseData = await apiCall('POST', 'tweets', 'create', payload, {}, {
      'Authorization': `Bearer ${userData.token}`,
    });


    function addUserDataToTweet(
      responseData: HTTPResponse,
      userParams: UserParams,
    ): TweetParams {
      const { tweet } = responseData;

      if (!tweet) {
        throw new Error('Tweet data is missing.');
      }

      tweet.User = {
        username: userParams.payload.username,
        displayName: userParams.payload.displayName ? userParams.payload.displayName : userParams.payload.username,
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
