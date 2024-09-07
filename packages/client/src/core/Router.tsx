import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Signup } from '@pages';
import { MainLayout } from 'src/layouts/main';

interface Page {
  path: string;
  element: React.ReactNode;
  title: string;
}

// TODO: move to separate file

const pages: Page[] = [
  {
    path: '/signup',
    element: <Signup />,
    title: 'PersonaVerse - Sign up',
  },
  {
    path: '/login',
    element: <Login />,
    title: 'PersonaVerse - Log in',
  },
  {
    path: '/',
    element: <Home />,
    title: 'PersonaVerse',
  },
];

export const router = createBrowserRouter(pages);

export const Router: React.FC = () => {
  const routeId = parseInt(router.state.matches[0].route.id);
  const pageTitle = pages[routeId].title;

  return (
    <MainLayout title={pageTitle}>
      <RouterProvider router={router} />
    </MainLayout>
  );
};
