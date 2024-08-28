import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Home } from '@pages';
import { useUserState } from '@hooks';
import { vi, describe, beforeEach, test, expect, Mock } from 'vitest';

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders welcome message and components when logged in', () => {
    render(
      <Router>
        <Home />
      </Router>,
    );

    // expect(useUserStateStub).toHaveBeenCalledOnce();

    expect(screen.getByText('Welcome John Doe!')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    screen.debug();
  });

  test('renders welcome message and buttons when logged out', () => {
    (useUserState as Mock).mockReturnValue({ jwt: null, isLoggedIn: false });

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('Create an account or log in.')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
