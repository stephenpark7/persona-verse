import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { JWT, State } from '../../src/interfaces/user';
import { JwtStorage } from 'src/utils/JwtStorage';

const setJwtReducer: CaseReducer<State, { payload: JWT; type: string; }> = (state: State, action: PayloadAction<JWT>) => {
  const { jwt } = state.value;
  const { payload } = action;
  if (jwt === payload) return;
  // console.log('jwt', jwt, 'setJwtReducer', payload);
  JwtStorage.setAccessToken(payload);
  state.value.jwt = action.payload;
};

const clearJwtReducer: CaseReducer<State> = (state: State) => {
  // console.log('clearJwtReducer');
  JwtStorage.clearAccessToken();
  state.value.jwt = null;
};

export {
  setJwtReducer,
  clearJwtReducer,
};
