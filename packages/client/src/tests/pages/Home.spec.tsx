import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { StoreStates, renderApp } from '../utils';

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
      expect(buttons).toHaveSomeTextContent('Sign up');
      expect(buttons).toHaveSomeTextContent('Log in');
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      renderApp(StoreStates.loggedIn);
    });

    it('renders p', () => {
      expect(screen.getAllByRole('paragraph')).toHaveSomeTextContent('Welcome test_user!');
    });

    it('renders textbox', () => {
      expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe('What\'s happening?');
    });

    it('renders heading', () => {
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Tweets');
    });

    it('renders paragraph', () => {
      expect(screen.getAllByRole('paragraph')).toHaveSomeTextContent('Loading...');
    });
    
    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).toHaveSomeTextContent('Tweet');
      expect(buttons).toHaveSomeTextContent('Log out');
    });
  });
});
