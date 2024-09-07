import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State, TweetData } from '@schemas';
import { initialState } from '@redux';

export const setTweetsReducer: CaseReducer<
  State,
  { payload: TweetData[]; type: string }
> = (state: State = initialState, action: PayloadAction<TweetData[]>) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      tweets: action.payload,
    },
  };
};

export const addTweetReducer: CaseReducer<
  State,
  { payload: TweetData; type: string }
> = (state: State = initialState, action: PayloadAction<TweetData>) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      tweets: state.value.tweets
        ? [...state.value.tweets, action.payload]
        : [action.payload],
    },
  };
};
