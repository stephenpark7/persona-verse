import { render } from '@testing-library/react';
import { ReduxProvider, Router } from '@core';

export const RenderApp = () => {
  render(
    <ReduxProvider>
      <Router />
    </ReduxProvider>,
  );
};
