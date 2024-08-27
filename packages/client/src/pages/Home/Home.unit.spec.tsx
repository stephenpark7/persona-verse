import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Home } from '@pages';
import { useUserState } from '@hooks';
import { getDisplayName } from '@utils';
import { vi, describe, beforeEach, test, expect, Mock } from 'vitest';
import { jwtFactory } from '@factories';

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders welcome message and components when logged in', () => {
    const useUserStateStub = vi.mocked(useUserState);

    useUserStateStub.mockReturnValue({ 
      jwt: jwtFactory(),
      isLoggedIn: true,
      tweets: null,
    });
    
    const getDisplayNameStub = vi.mocked(getDisplayName);
    
    getDisplayNameStub.mockReturnValue('John Doe');

    render(
      <Router>
        <Home />
      </Router>,
    );

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
