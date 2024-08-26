import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Home } from '@pages';
import { useUserState } from '@hooks';
import { getDisplayName } from '@utils';
import { vi, describe, beforeEach, test, expect, Mock } from 'vitest';
import { mockJwt } from 'src/tests/mocks';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
}));

vi.mock('@utils', () => ({
  getDisplayName: vi.fn(),
  JWTSchema: {
    parse: vi.fn(),
  },
  apiConfig: vi.fn(),
  tokenStorage: {
    getAccessToken: vi.fn(),
  },
}));

vi.mock('@components', () => ({
  Button: ({ children }: { 
    children: React.ReactNode 
  }) => <button>
    {children}
  </button>,
  Profile: () => <div>Profile</div>,
  TweetContainer: () => <div>TweetContainer</div>,
  LogoutButton: () => <button>Logout</button>,
}));

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders welcome message and components when logged in', () => {
    vi.mocked(useUserState).mockReturnValue({ 
      jwt: mockJwt,
      isLoggedIn: true,
      tweets: null,
    });
    vi.mocked(getDisplayName).mockReturnValue('John Doe');

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
