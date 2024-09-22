import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@pages';

export const router = createBrowserRouter(routes);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
