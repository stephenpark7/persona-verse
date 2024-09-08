import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { State } from '@schemas';
import { initialState } from '@redux';

export const setDocTitleReducer: CaseReducer<State, PayloadAction<string>> = (
  state: State = initialState,
  action: PayloadAction<string>,
) => {
  if (!action.payload) return state;
  document.title = action.payload;
  return {
    ...state,
    value: {
      ...state.value,
      title: action.payload,
    },
  };
};
