import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderApp } from '../utils';
import { getDisplayNameStub, useUserStateStub } from '@mocks';
import { UserType } from '@factories';

describe('Home page', () => {
  describe('initial state', () => {
    beforeEach(() => {
      useUserStateStub(UserType.Guest);
      renderApp();
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
  });

  describe('when user is not logged in', () => {
    beforeEach(() => {
      useUserStateStub(UserType.Guest);
      renderApp();
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

  describe('when user is logged in', () => {
    beforeEach(() => {
      useUserStateStub(UserType.User);
      getDisplayNameStub(UserType.User);
      // vi.restoreAllMocks();
      // vi.clearAllMocks();
      // vi.resetAllMocks();
      renderApp();
    });

    it('renders p', () => {
      screen.debug();
      expect(screen.getAllByRole('paragraph')).someToContainText('Loading...');
    });

    it('renders textbox', () => {
      expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe(
        "What's happening?",
      );
    });

    it('renders paragraph', () => {
      expect(screen.getAllByRole('paragraph')).someToContainText('Loading...');
    });

    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons).someToContainText('Tweet');
      expect(buttons).someToContainText('Log out');
    });
  });
});
