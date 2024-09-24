import { screen } from '@testing-library/react';
import { preloadedStateFactory } from '@factories';
import { renderApp } from '@tests/utils';
import { APP_TITLE } from '@utils';

describe('When visiting the home page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      renderApp();
    });

    it('has a title', () => {
      expect(document.title).toBe(APP_TITLE);
    });

    it('renders h1', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        APP_TITLE,
      );
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
      renderApp(undefined, preloadedStateFactory());
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
      expect(buttons).toHaveLength(1);
      expect(buttons).someToContainText('Tweet');
    });
  });
});
