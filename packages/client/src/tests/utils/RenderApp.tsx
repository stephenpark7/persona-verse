import React from 'react';
import { beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ReduxProvider, Router } from '@core';

export const RenderApp = () => {
  beforeEach(() => {
    render(
      <ReduxProvider>
        <Router />
      </ReduxProvider>,
    );
  });
};

