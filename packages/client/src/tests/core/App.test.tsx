// @vitest-environment jsdom

import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../../core/App.core';

test('App renders without crashing', () => {
  render(<App />);

  // screen.logTestingPlaygroundURL();

  const app = screen.queryByText(/Twitter/, {
    selector: 'h1',
  });

  expect(app).toBeTruthy();

  const signUp = screen.queryByText(/Sign up/, {
    selector: 'button',
  });

  expect(signUp).toBeTruthy();

  const logIn = screen.queryByText(/Log in/, {
    selector: 'button',
  });

  expect(logIn).toBeTruthy();
});
