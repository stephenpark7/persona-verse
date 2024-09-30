import { getByAltText, screen as origScreen } from '@testing-library/react';

export const screen = {
  debug: origScreen.debug,
  getByTestId: origScreen.getByTestId,
  getByText: origScreen.getByText,
  getByAltText: (altText: string) => getByAltText(document.body, altText),
  queryByTestId: origScreen.queryByTestId,
};
