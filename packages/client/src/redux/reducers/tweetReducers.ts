import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State, TweetProps } from '@interfaces';
import { initialState } from '@redux';

const setTweetsReducer: CaseReducer<
  State,
  { payload: TweetProps[]; type: string }
> = (state: State = initialState, action: PayloadAction<TweetProps[]>) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      tweets: action.payload,
    },
  };
};

const addTweetReducer: CaseReducer<
  State,
  { payload: TweetProps; type: string }
> = (state: State = initialState, action: PayloadAction<TweetProps>) => {
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

export { addTweetReducer, setTweetsReducer };
