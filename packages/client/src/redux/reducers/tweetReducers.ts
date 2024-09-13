import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State, Tweet } from '@schemas';
import { initialState } from '@redux';

export const setTweetsReducer: CaseReducer<
  State,
  { payload: Tweet[]; type: string }
> = (state: State = initialState, action: PayloadAction<Tweet[]>) => {
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
  { payload: Tweet; type: string }
> = (state: State = initialState, action: PayloadAction<Tweet>) => {
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
