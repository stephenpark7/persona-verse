import { CaseReducer } from '@reduxjs/toolkit';
import type { Profile, UserState } from '@schemas';

export const setProfileReducer: CaseReducer<
  UserState,
  { payload: Profile; type: string }
> = (state: UserState, action) => {
  if (!action.payload) return state;
  return {
    value: {
      ...state.value,
      profile: action.payload,
    },
  };
};
