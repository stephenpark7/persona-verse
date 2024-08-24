import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { Home, Login, Signup } from '@pages';
import { MainLayout } from 'src/layouts/main';

const pages: RouteObject[] = [
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

const router = createBrowserRouter(pages);

export const Router: React.FC = () => {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  );
};
