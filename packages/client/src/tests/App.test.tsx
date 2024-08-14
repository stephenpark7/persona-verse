import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';
import { act } from 'react';

describe('App renders without crashing', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders h1', () => {
    const h1 = screen.getByText(/Twitter/, { selector: 'h1' });
    expect(h1).toBeInTheDocument();
  });

  it('renders p', () => {
    const p = screen.getByText(/Create an account or log in./, { selector: 'p' });
    expect(p).toBeInTheDocument();
  });

  it('renders buttons', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Sign up');
    expect(buttons[1]).toHaveTextContent('Log in');
  });

  describe('clicking sign up button', () => {
    it('renders sign up form', () => {
      const signUpButton = screen.getByText('Sign up', { selector: 'button' });
      act (() => signUpButton.click());
      const h1 = screen.getByText(/Sign up/, { selector: 'h1' });
      expect(h1).toBeInTheDocument();
      screen.debug();
    });
  });
});
