import React from 'react';
import { vi } from 'vitest';

// TODO: only mock for unit tests

vi.mock('@components', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  Profile: () => <div>Profile</div>,
  TweetContainer: () => <div>TweetContainer</div>,
  LogoutButton: () => <button>Logout</button>,
}));
