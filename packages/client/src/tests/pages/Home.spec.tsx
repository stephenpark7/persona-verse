import { expect, describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderApp } from '../utils';
import { User } from '@interfaces';
import { jwtFactory } from '@factories';

describe('When visiting the home page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      const guestUser: User = {
        state: {
          value: {
            jwt: null,
            tweets: null,
          },
        },
      };

      const tweetAPI = {
        getTweets: {
          data: null,
          error: null,
          isLoading: false,
        },
        postTweet: {
          data: null,
          error: null,
          isLoading: false,
        },
      };

      renderApp(null, {
        user: {
          value: {
            ...guestUser.state.value,
          },
        },
        tweetAPI: {
          ...tweetAPI,
          queries: {},
          mutations: {},
          provided: {
            Tweets: {},
          },
          subscriptions: {},
          config: {
            reducerPath: 'tweetAPI',
            online: true,
            focused: true,
            middlewareRegistered: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            keepUnusedDataFor: 0,
            invalidationBehavior: 'immediately',
          },
        },
      });
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
      const regularUser: User = {
        state: {
          value: {
            jwt: jwtFactory(),
            tweets: null,
          },
        },
      };

      const tweetAPI = {
        getTweets: {
          data: null,
          error: null,
          isLoading: false,
        },
        postTweet: {
          data: null,
          error: null,
          isLoading: false,
        },
      };

      renderApp(null, {
        user: {
          value: {
            ...regularUser.state.value,
          },
        },
        tweetAPI: {
          ...tweetAPI,
          queries: {},
          mutations: {},
          provided: {
            Tweets: {},
          },
          subscriptions: {},
          config: {
            reducerPath: 'tweetAPI',
            online: true,
            focused: true,
            middlewareRegistered: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
            refetchOnFocus: true,
            keepUnusedDataFor: 0,
            invalidationBehavior: 'immediately',
          },
        },
      });
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
      screen.debug();
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
