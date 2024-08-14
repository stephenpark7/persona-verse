import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

test('App renders without crashing', () => {
  render(<App />);

  const h1 = screen.getByText(/Twitter/, { selector: 'h1' });
  expect(h1).toBeInTheDocument();

  const p = screen.getByText(/Create an account or log in./, { selector: 'p' });
  expect(p).toBeInTheDocument();

  const signUpBtn = screen.getByText(/Sign up/, { selector: 'button' });
  expect(signUpBtn).toBeInTheDocument();

  const logInBtn = screen.getByText(/Log in/, { selector: 'button' });
  expect(logInBtn).toBeInTheDocument();

  screen.debug();
});
