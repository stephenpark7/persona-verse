import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { JWT, State } from '../interfaces/user';
import { JwtStorage } from '../utils/JwtStorage';
import { TweetData } from '../interfaces';
import { initialState } from '../slices/initialState';

const setJwtReducer: CaseReducer<State, PayloadAction<JWT>>
= (state: State = initialState, action: PayloadAction<JWT>) => {
  if (!action.payload) return state;
  JwtStorage.setAccessToken(action.payload);
  return {
    value: {
      ...state.value,
      jwt: action.payload,
    },
  };
};

const clearJwtReducer: CaseReducer<State> = (state: State) => {
  JwtStorage.clearAccessToken();
  return {
    value: {
      ...state.value,
      jwt: null,
      tweets: null,
    },
  };
};

const setTweetsReducer: CaseReducer<State, { payload: TweetData[]; type: string; }> = (state: State = initialState, action: PayloadAction<TweetData[]>) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      tweets: action.payload,
    },
  };
};

const addTweetReducer: CaseReducer<State, { payload: TweetData; type: string; }> = (state: State = initialState, action: PayloadAction<TweetData>) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      tweets: state.value.tweets ? [ ...state.value.tweets, action.payload ] : [ action.payload ],
    },
  };
};

export {
  setJwtReducer,
  clearJwtReducer,
  addTweetReducer,
  setTweetsReducer,
};
