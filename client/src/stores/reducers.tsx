import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { JWT, State } from '../../src/interfaces/user';

const setJwtReducer: CaseReducer<State, { payload: JWT; type: string; }> = (state: State, action: PayloadAction<JWT>) => {
  state.value.jwt = action.payload;
};

const clearJwtReducer: CaseReducer<State> = (state: State) => {
  localStorage.removeItem('jwt');
  state.value.jwt = null;
};

export {
  setJwtReducer,
  clearJwtReducer,
};
