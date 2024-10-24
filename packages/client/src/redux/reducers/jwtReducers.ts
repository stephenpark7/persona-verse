import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { Jwt, UserState } from '@schemas';
import { initialState } from '@redux';
import { tokenStorage } from '@utils';

export const setJwtReducer: CaseReducer<UserState, PayloadAction<Jwt>> = (
  state: UserState = initialState.user,
  action: PayloadAction<Jwt>,
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
