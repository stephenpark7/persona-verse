import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { JWT, State } from '../interfaces/user';
import { JwtStorage } from '../utils/JwtStorage';
import { TweetData } from '../interfaces';
import { initialState } from '../stores/';

const setJwtReducer: CaseReducer<State, { payload: JWT; type: string; }> 
= (state: State = initialState, action: PayloadAction<JWT>) => {
  const { jwt } = state.value;
  const { payload } = action;
  
  if (jwt === payload) {
    return;
  }

  JwtStorage.setAccessToken(payload);
  state.value.jwt = action.payload;
  return state;
};

const clearJwtReducer: CaseReducer<State> = (state: State) => {
  JwtStorage.clearAccessToken();
  state.value.jwt = null;
};

const setTweetsReducer: CaseReducer<State, { payload: TweetData[]; type: string; }> = (state: State = initialState, action: PayloadAction<TweetData[]>) => {
  // console.log(action.payload);
  state.value.tweets = action.payload;
  return state;
};

const addTweetReducer: CaseReducer<State, { payload: TweetData; type: string; }> = (state: State = initialState, action: PayloadAction<TweetData>) => {
  // console.log(action.payload);
  const tweet = action.payload;
  // const currTweets = current(state.value.tweets);
  // console.log(currTweets);
  state.value.tweets!.push(tweet);
  // console.log(current(state.value.tweets));
  return state;
};

export {
  setJwtReducer,
  clearJwtReducer,
  addTweetReducer,
  setTweetsReducer,
};
