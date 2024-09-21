import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { UserState, Tweet } from '@schemas';
import { initialState } from '@redux';

export const setTweetsReducer: CaseReducer<
  UserState,
  { payload: Tweet[]; type: string }
> = (state: UserState = initialState.user, action: PayloadAction<Tweet[]>) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      tweets: action.payload,
    },
  };
};

export const addTweetReducer: CaseReducer<
  UserState,
  { payload: Tweet; type: string }
> = (state: UserState = initialState.user, action: PayloadAction<Tweet>) => {
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
