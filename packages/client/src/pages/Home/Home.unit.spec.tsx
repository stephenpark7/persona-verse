import '../../tests/mocks/components.unit';

import { screen } from '@testing-library/react';
import { describe, beforeEach, it, expect } from 'vitest';
import { Home } from '@pages';
import { UserType } from '@factories';
import { useUserStateStub } from '@mocks';
import { renderPage } from '@helpers';

describe('When visiting the home page', () => {
  describe('while logged out', () => {
    beforeEach(() => {
      useUserStateStub(UserType.Guest);
      renderPage(<Home />);
    });

    it('renders welcome message', () => {
      expect(
        screen.getByText('Create an account or log in.'),
      ).toBeInTheDocument();
    });

    it('renders sign up button', () => {
      expect(screen.getByText('Sign up')).toBeInTheDocument();
    });

    it('renders log in button', () => {
      expect(screen.getByText('Log in')).toBeInTheDocument();
    });

    it('does not render welcome message', () => {
      expect(screen.queryByText('Welcome John Doe!')).not.toBeInTheDocument();
    });

    it('does not render profile', () => {
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });

    it('does not render tweet container', () => {
      expect(screen.queryByText('TweetContainer')).not.toBeInTheDocument();
    });

    it('does not render logout button', () => {
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  describe('while logged in', () => {
    beforeEach(() => {
      useUserStateStub(UserType.User);
      // getDisplayNameStub(UserType.User);
      renderPage(<Home />);
      // renderApp();
    });

    it('renders welcome message', () => {
      screen.debug();
      expect(screen.getByText('Welcome john-doe!')).toBeInTheDocument();
    });

    it('renders profile', () => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('renders tweet container', () => {
      expect(screen.getByText('TweetContainer')).toBeInTheDocument();
    });

    it('renders logout button', () => {
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('does not render sign up button', () => {
      expect(screen.queryByText('Sign up')).not.toBeInTheDocument();
    });

    it('does not render log in button', () => {
      expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    });

    it('does not render create account message', () => {
      expect(
        screen.queryByText('Create an account or log in.'),
      ).not.toBeInTheDocument();
    });
  });
});
