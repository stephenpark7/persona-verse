import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { jwtFactory } from '@factories';
import { renderApp } from '../utils';
import { PreloadedStateFactory } from '../factories/redux';
import { RootState } from '@redux';

describe('When visiting the home page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      renderApp(null);
    });

    it('has a title', () => {
      expect(document.title).toBe('PersonaVerse');
    });

    it('renders h1', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'PersonaVerse',
      );
    });

    it('does not render h2', () => {
      expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    });

    it('renders p', () => {
      expect(screen.getByRole('paragraph')).toHaveTextContent(
        'Create an account or log in.',
      );
    });

    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).someToContainText('Sign up');
      expect(buttons).someToContainText('Log in');
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      renderApp(null, PreloadedStateFactory());
    });

    it('renders paragraph', () => {
      expect(screen.getAllByRole('paragraph')).someToContainText('Loading...');
    });

    it('renders textbox', () => {
      expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe(
        "What's happening?",
      );
    });

    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).someToContainText('Tweet');
      expect(buttons).someToContainText('Log out');
    });

    it('does not render sign up button', () => {
      expect(screen.queryByText('Sign up')).toBeNull();
    });

    it('does not render log in button', () => {
      expect(screen.queryByText('Log in')).toBeNull();
    });

    it('does not render create account message', () => {
      expect(screen.queryByText('Create an account or log in.')).toBeNull();
    });
  });
});
