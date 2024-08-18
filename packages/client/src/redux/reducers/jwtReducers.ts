import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State } from '@interfaces';
import { initialState } from '../slices';
import { tokenStorage } from '@utils';
import type { JWT } from '@shared/jwt';

const setJwtReducer: CaseReducer<State, PayloadAction<JWT>>
= (state: State = initialState, action: PayloadAction<JWT>) => {
  if (!action.payload) return state;
  tokenStorage.setAccessToken(action.payload);
  return {
    value: {
      ...state.value,
      jwt: action.payload,
    },
  };
};

const clearJwtReducer: CaseReducer<State> = (state: State) => {
  tokenStorage.clearAccessToken();
  return {
    value: {
      ...state.value,
      jwt: null,
      tweets: null,
    },
  };
};

export { setJwtReducer, clearJwtReducer };
