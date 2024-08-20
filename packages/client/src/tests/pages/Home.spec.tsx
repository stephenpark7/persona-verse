import { expect, describe, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ReduxProvider, Router } from '@core';
import { tokenStorage } from '@utils';
import { store } from '@redux';
import { RenderApp } from '../utils';
import { mockJwt } from '../mocks';


describe('Home page', () => {

  describe('initial state', () => {
    beforeEach(() => {
      RenderApp();
    });

    it('has a title', () => {
      expect(document.title).toBe('PersonaVerse');
    });
  
    it('renders h1', () => {
      expect(screen.getByText(/PersonaVerse/, { selector: 'h1' })).toBeInTheDocument();
    });
  });

  describe('when user is not logged in', () => {

    // TODO: mocking token storage will only work
    // once, since localstorage doesn't reset between tests
    // and/or: the store doesn't get rebuilt between tests
    // it will be cached and reused

    // you have to set up Redux store for each test/test file
    // and clear the Redux store after each test/test file

    // https://github.com/reduxjs/redux/issues/4239

    beforeEach(() => {
      RenderApp();
    });

    it('renders p', () => {
      expect(screen.getByText(/Create an account or log in./, { selector: 'p' })).toBeInTheDocument();
    });

    it('renders buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Sign up');
      expect(buttons[1]).toHaveTextContent('Log in');
    });
  });

  describe('when user is logged in', () => {
    it('renders p', () => {
      expect(store.getState()).toMatchObject({
        user: {
          value: {
            jwt: mockJwt,
            tweets: null,
          },
        },
      });

      RenderApp();

      expect(screen.getByText(/Welcome/, { selector: 'p' })).toBeInTheDocument();
    });
  });
});
