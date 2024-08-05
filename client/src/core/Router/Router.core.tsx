import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { Home, Login, Signup } from '../../pages';

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
    <RouterProvider router={router} />
  );
};
