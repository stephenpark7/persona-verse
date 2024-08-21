import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderApp } from '../utils';
import { mockJwt } from '../mocks';

describe('Home page', () => {

  describe('initial state', () => {
    beforeEach(() => {
      renderApp();
    });

    it('has a title', () => {
      expect(document.title).toBe('PersonaVerse');
    });
  
    it('renders h1', () => {
      expect(screen.getByText(/PersonaVerse/, { selector: 'h1' })).toBeInTheDocument();
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      renderApp();
    });

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
      renderApp({
        user: {
          value: {
            jwt: mockJwt,
            tweets: null,
          },
        },
      });
    });

    it('renders p', () => {
      expect(screen.getAllByRole('paragraph')).toHaveSomeText('Welcome test_user!');
    });

    it('renders tweet container', () => {
      expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe('What\'s happening?');
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveSomeText('Tweet');
      expect(buttons).toHaveSomeText('Log out');
    });
  });
});
