import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State } from '@schemas';
import { initialState } from '@redux';
import { tokenStorage } from '@utils';
import type { JWT } from '@shared';

export const setJwtReducer: CaseReducer<State, PayloadAction<JWT>> = (
  state: State = initialState,
  action: PayloadAction<JWT>,
) => {
  if (!action.payload) return state;
  tokenStorage.setAccessToken(action.payload);
  return {
    value: {
      ...state.value,
      jwt: action.payload,
    },
  };
};

export const clearJwtReducer: CaseReducer = () => {
  tokenStorage.clearAccessToken();
  return {
    value: {
      jwt: null,
      tweets: null,
    },
  };
};
