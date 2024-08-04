import { PostTweet, TweetData } from '../interfaces/api';
import { apiCall } from '.';
import { setTweets, store } from '../stores';
import { addTweet } from '../stores/thunks';

async function getTweets(
): Promise<TweetData[]> {
  const data = await apiCall({
    method: 'GET',
    controller: 'tweets',
    action: 'get',
  }, false);

  if (!data) return [];

  if (!data.tweets) {
    throw new Error('Failed to retrieve tweets.');
  }

  store.dispatch(setTweets(data.tweets));
  // console.log(data.tweets);
  return data.tweets;
}

async function postTweet({
  jwt,
  payload,
}: PostTweet): Promise<void> {
  if (!jwt) {
    throw new Error('Failed to post tweet.');
  }

  const data = await apiCall({
    method: 'POST',
    controller: 'tweets',
    action: 'create',
    body: payload,
  }, true);

  if (!data || !data.tweet) return;

  data.tweet.User = {
    username: jwt.payload.username,
    displayName: jwt.payload.displayName ? jwt.payload.displayName : jwt.payload.username,
  };

  await addTweet(data.tweet)(store.dispatch, () => store.getState().user);

  // console.log(store.getState().user.value.tweets);

  // const tweets = store.getState().user.value.tweets;

  // if (!tweets) {
  //   throw new Error('Failed to post tweet.');
  // }

  // store.dispatch(setTweets([ data.tweet!, ...tweets! ]));
}

export {
  getTweets,
  postTweet,
};
