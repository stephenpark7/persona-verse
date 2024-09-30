import { screen as origScreen } from '@testing-library/react';

export const screen = {
  debug: origScreen.debug,
  getByTestId: origScreen.getByTestId,
  getByText: origScreen.getByText,
  queryByTestId: origScreen.queryByTestId,
};
