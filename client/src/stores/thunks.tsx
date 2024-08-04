import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { JWT, TweetData } from '../interfaces';
import { JwtStorage } from '../utils/JwtStorage';
import { State } from '../interfaces/user';

const setJwt = (jwt: JWT) => {
  return async function setJwtThunk(dispatch: Dispatch<UnknownAction>, getState: () => State) {
    // console.log(getState());
    JwtStorage.setAccessToken(jwt);
    dispatch({ type: 'user/setJwt', payload: jwt });
  };
};

const addTweet = (tweet: TweetData) => {
  return async function addTweetThunk(dispatch: Dispatch<UnknownAction>, getState: () => State) {
    // console.log(getState());
    // console.log(tweet);
    // dispatch({ type: 'user/addTweet', payload: tweet });
    dispatch({ type: 'user/setTweets', payload: [  tweet, ...getState().value.tweets! ] });
  };
};

export { setJwt, addTweet };
