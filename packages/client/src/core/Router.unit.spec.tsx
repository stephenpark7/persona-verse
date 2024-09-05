import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { createMemoryRouter } from 'react-router-dom';
import { Home, Login, Signup } from '@pages';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderApp } from 'src/tests/utils';
import { MainLayout } from 'src/layouts';

vi.mock('src/layouts/main', () => ({
  MainLayout: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

describe('Router', () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
  ];

  it.only('renders title', () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    renderApp(<RouterProvider router={router} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'PersonaVerse',
    );
  });

  // TODO: check to make sure MainLayout and RouterProvider are returned
  // TODO: mock use state instead, and use render instead of renderApp
});
