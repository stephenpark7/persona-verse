import { screen as origScreen } from '@testing-library/react';

export const screen = {
  debug: origScreen.debug,
  getByAltText: origScreen.getByAltText,
  getByClassName: (className: string) =>
    document.body.querySelector(`.${className}`),
  getByLabelText: origScreen.getByLabelText,
  getByRole: origScreen.getByRole,
  getByTestId: origScreen.getByTestId,
  getByText: origScreen.getByText,
  queryByTestId: origScreen.queryByTestId,
};
