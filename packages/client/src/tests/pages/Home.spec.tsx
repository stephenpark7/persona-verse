import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderApp } from '../utils';

describe('Home page', () => {
  describe('initial state', () => {
    beforeEach(() => {
      renderApp();
    });

    it('has a title', () => {
      expect(document.title).toBe('PersonaVerse');
      screen.debug();
    });

    it.skip('renders h1', () => {
      screen.debug();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'PersonaVerse',
      );
    });

    it.skip('does not render h2', () => {
      expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    });
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      renderApp();
    });

    it.skip('renders p', () => {
      expect(screen.getByRole('paragraph')).toHaveTextContent(
        'Create an account or log in.',
      );
    });

    it.skip('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).someToContainText('Sign up');
      expect(buttons).someToContainText('Log in');
    });
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      renderApp(StoreStateStubs.loggedIn);
    });

    it.skip('renders p', () => {
      expect(screen.getAllByRole('paragraph')).someToContainText('Loading...');
    });

    it.skip('renders textbox', () => {
      expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe(
        "What's happening?",
      );
    });

    it.skip('renders paragraph', () => {
      expect(screen.getAllByRole('paragraph')).someToContainText('Loading...');
    });

    it.skip('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).someToContainText('Tweet');
      expect(buttons).someToContainText('Log out');
    });
  });
});
