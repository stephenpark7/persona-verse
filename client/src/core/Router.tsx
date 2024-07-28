import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

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

export const Router: React.FC = () => {
  const router = createBrowserRouter(pages);

  return (
    <RouterProvider router={router} />
  );
};
