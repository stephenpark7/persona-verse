import { beforeEach, expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Signup } from '@pages';
import { BrowserRouter } from 'react-router-dom';

describe('Sign up page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
  });

  it('has a title', () => {
    expect(document.title).toBe('Sign up - PersonaVerse');
  });

  it('renders h1', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Sign up');
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