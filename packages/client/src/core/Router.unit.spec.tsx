import '../tests/mocks/components';
import { useUserStateStub } from '../tests/mocks/hooks';

import { render, screen } from '@testing-library/react';
import { UserType } from '@factories';
import { Router } from '@core';

// vi.mock('src/layouts/main', () => ({
//   MainLayout: ({
//     title,
//     children,
//   }: {
//     title: string;
//     children: React.ReactNode;
//   }) => (
//     <div>
//       <h1>{title}</h1>
//       {children}
//     </div>
//   ),
// }));

describe('Router', () => {
  // const routes = [
  //   { path: '/', element: <Home /> },
  //   { path: '/login', element: <Login /> },
  //   { path: '/signup', element: <Signup /> },
  // ];

  beforeEach(() => {
    useUserStateStub(UserType.GUEST);
    render(<Router />);
  });

  it.only('renders home page by default', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'PersonaVerse',
    );
  });

  // TODO: check to make sure MainLayout and RouterProvider are returned
  // meaning we should mock MainLayout and RouterProvider
});
