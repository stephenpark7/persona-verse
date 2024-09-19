import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { UserState } from '@schemas';
import { initialState } from '@redux';
import { tokenStorage } from '@utils';
import type { JWT } from '@shared';

export const setJwtReducer: CaseReducer<UserState, PayloadAction<JWT>> = (
  state: UserState = initialState.user,
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
