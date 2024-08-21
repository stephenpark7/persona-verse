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
    beforeEach(() => {
      localStorage.clear();
      RenderApp();
      screen.debug();
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
      // expect(store.getState()).toMatchObject({
      //   user: {
      //     value: {
      //       jwt: mockJwt,
      //       tweets: null,
      //     },
      //   },
      // });

      RenderApp(mockJwt);

      expect(screen.getByText(/Welcome/, { selector: 'p' })).toBeInTheDocument();
    });
  });
});
