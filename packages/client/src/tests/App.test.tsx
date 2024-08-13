// @vitest-environment jsdom
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

test('App renders without crashing', () => {
  render(<App />);

  // screen.logTestingPlaygroundURL();

  const h1 = screen.queryByText(/Twitter/, {
    selector: 'h1',
  });

  expect(h1).toBeTruthy();

  const p = screen.queryByText(/Create an account or log in./, {
    selector: 'p',
  });

  expect(p).toBeTruthy();

  const signUp = screen.queryByText(/Sign up/, {
    selector: 'button',
  });

  expect(signUp).toBeTruthy();

  const logIn = screen.queryByText(/Log in/, {
    selector: 'button',
  });

  expect(logIn).toBeTruthy();
});
