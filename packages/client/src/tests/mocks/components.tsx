import React from 'react';

vi.mock('@components', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  Profile: () => <div>Profile</div>,
  TweetContainer: () => <div>TweetContainer</div>,
  LogoutButton: () => <button>LogoutButton</button>,
}));
