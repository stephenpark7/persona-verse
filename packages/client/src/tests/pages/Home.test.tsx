import { beforeEach, expect, describe, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '@pages';
import { ReduxProvider } from '@core';

describe('Home page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ReduxProvider>
          <Home />
        </ReduxProvider>
      </BrowserRouter>,
    );
  });

  it('has a title', () => {
    expect(document.title).toBe('PersonaVerse');
  });

  it('renders h1', () => {
    expect(screen.getByText(/PersonaVerse/, { selector: 'h1' })).toBeInTheDocument();
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

  // describe('clicking sign up button', () => {
  //   it('renders sign up form', async () => {
  //     // const signUpButton = screen.getByText('Sign up', { selector: 'button' });
  //     //  await user.click(screen.getByRole('button', { name: 'Sign up' }));
  //     // act(() => {
  //     //   user.click(screen.getByRole('button', { name: 'Sign up' }));
  //     // });
  //     //  await waitFor(() => {
  //     //   screen.debug();
  //     //   expect(screen.getByText(/Sign up/, { selector: 'h1' })).toBeInTheDocument();
  //     //  });
  //     // expect(document.title).toBe('Sign up - PersonaVerse');
  //     // act (() => signUpButton.click());
  //     screen.debug();

  //     const a = screen.getByText('', { selector: '.signup-link' });

  //     // act(() => a.click());

  //     act(() => user.click(a));

  //     screen.debug();


  //   });
  // });
});
