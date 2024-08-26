import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Home';
import { useUserState } from '@hooks';
import { getDisplayName } from '@utils';
import { vi, describe, beforeEach, test, expect, Mock } from 'vitest';

// Mock the dependencies
vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
}));

vi.mock('@utils', () => ({
  getDisplayName: vi.fn(),
}));

vi.mock('@components', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button>
    {children}
  </button>,
  LogoutButton: () => <button>Logout</button>,
  TweetContainer: () => <div>TweetContainer</div>,
  Profile: () => <div>Profile</div>,
}));

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders welcome message and components when logged in', () => {
    (useUserState as Mock).mockReturnValue({ jwt: 'fake-jwt', isLoggedIn: true });
    (getDisplayName as Mock).mockReturnValue('John Doe');

    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(screen.getByText('Welcome John Doe!')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
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
