import {
  getByAltText,
  getByLabelText as origGetByLabelText,
  screen as origScreen,
} from '@testing-library/react';

export const screen = {
  debug: origScreen.debug,
  getByAltText: (altText: string) => getByAltText(document.body, altText),
  getByClassName: (className: string) =>
    document.body.querySelector(`.${className}`),
  getByLabelText: (labelText: string) =>
    origGetByLabelText(document.body, labelText),
  getByTestId: origScreen.getByTestId,
  getByText: origScreen.getByText,
  queryByTestId: origScreen.queryByTestId,
};
