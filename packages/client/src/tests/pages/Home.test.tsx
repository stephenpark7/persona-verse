import { screen, waitFor } from '@testing-library/react';
import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';
import { renderApp } from '@tests/utils';
import { APP_TITLE } from '@utils';

const jwt = jwtFactory();
const tweets = [tweetFactory()];
const preloadedState = preloadedStateFactory({
  user: {
    value: {
      jwt,
      tweets,
    },
  },
});

vi.mock('@services', () => ({
  getTweets: async () => tweets,
}));

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
      renderApp(undefined, preloadedState);
    });

    it('renders paragraph', async () => {
      screen.debug();
      await waitFor(() => {
        expect(screen.getByRole('paragraph')).toHaveTextContent(
          `Welcome ${jwt.payload.username}!`,
        );
      });
    });

    it('renders textbox', () => {
      expect(screen.getByRole('textbox').getAttribute('placeholder')).toBe(
        "What's happening?",
      );
    });

    it('renders button', async () => {
      expect(
        screen.queryByRole('button', { name: 'Tweet' }),
      ).toBeInTheDocument();
    });
  });
});
