// @vitest-environment jsdom

import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../core/App.core';

test('App renders without crashing', () => {
  render(<App />);

  const app = screen.getByText('Twitter');

  expect(app).toBeTruthy();
  
});
