import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { JWT, State } from '../../src/interfaces/user';
import { JwtStorage } from 'src/utils/JwtStorage';
import { TweetData } from 'src/interfaces';

const setJwtReducer: CaseReducer<State, { payload: JWT; type: string; }> = (state: State, action: PayloadAction<JWT>) => {
  const { jwt } = state.value;
  const { payload } = action;
  
  if (jwt === payload) {
    return;
  }

  JwtStorage.setAccessToken(payload);
  state.value.jwt = action.payload;
};

const clearJwtReducer: CaseReducer<State> = (state: State) => {
  JwtStorage.clearAccessToken();
  state.value.jwt = null;
};

const setTweetsReducer: CaseReducer<State, { payload: TweetData[]; type: string; }> = (state: State, action: PayloadAction<TweetData[]>) => {
  state.value.tweets = action.payload;
};

export {
  setJwtReducer,
  clearJwtReducer,
  setTweetsReducer,
};
