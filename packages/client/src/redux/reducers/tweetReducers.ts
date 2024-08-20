import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State, TweetData } from '@interfaces';
import { initialState } from '@redux';

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

export { addTweetReducer, setTweetsReducer };
