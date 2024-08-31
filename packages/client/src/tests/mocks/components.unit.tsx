// import React from 'react';
// import { vi } from 'vitest';

// TODO: only mock for unit tests
// because it will fail in integration tests
// components.tsx

// vi.mock('@components', () => ({
//   Button: ({ children }: { children: React.ReactNode }) => (
//     <button>{children}</button>
//   ),
//   Profile: () => <div>Profile</div>,
//   TweetContainer: () => <div>TweetContainer</div>,
//   LogoutButton: () => <button>Logout</button>,
// }));

// const mocks = vi.hoisted(() => {
//   vi.mock('@components', () => ({
//     Button: ({ children }: { children: React.ReactNode }) => (
//       <button>{children}</button>
//     ),
//     Profile: () => <div>Profile</div>,
//     TweetContainer: () => <div>TweetContainer</div>,
//     LogoutButton: () => <button>Logout</button>,
//   }));
// });

// import { vi } from 'vitest';

// import { Button, Profile, TweetContainer, LogoutButton } from '@components';

// import { ReduxProvider } from '@';

// const mocks = vi.hoisted(() => {
//   return {
//     Button: vi.fn(),
//     Profile: vi.fn(),
//     TweetContainer: vi.fn(),
//     LogoutButton: vi.fn(),
//   };
// });

// vi.mock('@components', () => {
//   return {
//     Button: mocks.Button,
//     Profile: mocks.Profile,
//     TweetContainer: mocks.TweetContainer,
//     LogoutButton: mocks.LogoutButton,
//   };
// });

import { Profile } from '@components';
import React from 'react';

// vi.mock('@components', () => ({
//   Button: ({ children }: { children: React.ReactNode }) => (
//     <button>{children}</button>
//   ),
//   Profile: () => <div>Profile</div>,
//   TweetContainer: () => <div>TweetContainer</div>,
//   LogoutButton: () => <button>Logout</button>,
// }));
