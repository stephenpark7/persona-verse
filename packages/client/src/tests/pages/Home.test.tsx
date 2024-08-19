import { beforeEach, expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReduxProvider } from '@core';
import { Home } from '@pages';
import { JWTSchema } from '@utils';
import { setJwt, store } from '@redux';

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

  describe('when user is not logged in', () => {
    it('renders p', () => {
      expect(screen.getByText(/Create an account or log in./, { selector: 'p' })).toBeInTheDocument();
    });

    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Sign up');
      expect(buttons[1]).toHaveTextContent('Log in');
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      const mockJwt = JWTSchema.parse({
        token: 'token',
        expiresAt: Date.now() + 1000,
        payload: {
          userId: 1,
          username: 'user',
        },
       });
      store.dispatch(setJwt(mockJwt));
      console.log('store', store.getState().user);
      // localStorage.setItem('jwt', JSON.stringify(mockJwt));
      // console.log('mockJwt', localStorage.getItem('jwt'));
    });

    it('renders p', () => {
      screen.debug();
      expect(screen.getByText(/Welcome/, { selector: 'p' })).toBeInTheDocument();
    });
  });
});
