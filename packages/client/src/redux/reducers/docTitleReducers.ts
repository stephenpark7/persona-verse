import { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { BrowserState } from '@schemas';
import { initialState } from '@redux';

export const setDocTitleReducer: CaseReducer<
  BrowserState,
  PayloadAction<string>
> = (
  state: BrowserState = initialState.browser,
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
