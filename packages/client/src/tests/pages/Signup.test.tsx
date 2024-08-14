import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Signup } from '../../pages/Signup/Signup';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';

describe('Sign up page renders without crashing', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

    screen.debug();
  });

  it('renders h1', () => {
    expect(screen.getByText(/Sign up/, { selector: 'h1' })).toBeInTheDocument();
  });

  it('renders form', () => {
    expect(screen.getByText('', { selector: 'form' })).toBeInTheDocument();
  });

  it('renders input fields', () => {
    expect(screen.getByText('', { selector: 'input[name=username]' })).toBeInTheDocument();
    expect(screen.getByText('', { selector: 'input[name=email]' })).toBeInTheDocument();
    expect(screen.getByText('', { selector: 'input[name=password]' })).toBeInTheDocument();
    expect(screen.getByText('Sign up', { selector: 'button[type=submit' })).toBeInTheDocument();
  });
});
