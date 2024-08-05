import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { JWT, State } from '../../interfaces';
import { JwtStorage } from '../../utils';
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

export { setJwtReducer, clearJwtReducer };
