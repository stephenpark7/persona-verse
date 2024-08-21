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
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('PersonaVerse');
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      renderApp();
    });

    it('renders p', () => {
      expect(screen.getByRole('paragraph')).toHaveTextContent('Create an account or log in.');
    });

    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).toHaveSomeText('Sign up');
      expect(buttons).toHaveSomeText('Log in');
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
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Tweets');
      expect(screen.getAllByRole('paragraph')).toHaveSomeText('Loading...');
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveSomeText('Tweet');
      expect(buttons).toHaveSomeText('Log out');
    });
  });
});
