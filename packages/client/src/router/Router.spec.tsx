import { screen, renderWithRouter } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';
import { Router } from '@router';
import { waitFor } from '@testing-library/react';

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

describe('When rendering the router', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      renderWithRouter(undefined, undefined, Router);
    });

    describe('when on home page', () => {
      it('does not redirect', () => {
        expect(window.location.pathname).toBe('/');
      });

      it('has correct title', () => {
        expect(document.title).toBe('PersonaVerse');
      });
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      renderWithRouter(undefined, preloadedState, Router);
    });

    describe('when on home page', () => {
      it('displays loading message', () => {
        expect(screen.getByTestId('paragraph')).toHaveTextContent(
          'Redirecting...',
        );
      });

      it('redirects to dashboard', async () => {
        await waitFor(() => {
          expect(window.location.pathname).toBe('/dashboard');
        });
      });

      it('has correct title', () => {
        expect(document.title).toBe('PersonaVerse - Dashboard');
      });
    });
  });
});
