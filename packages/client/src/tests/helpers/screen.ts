import { getByAltText, screen as origScreen } from '@testing-library/react';

export const screen = {
  debug: origScreen.debug,
  getByAltText: (altText: string) => getByAltText(document.body, altText),
  getByClassName: (className: string) =>
    document.body.querySelector(`.${className}`),
  getByTestId: origScreen.getByTestId,
  getByText: origScreen.getByText,
  queryByTestId: origScreen.queryByTestId,
};
