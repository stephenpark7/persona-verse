import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes } from './Routes';

const router = createBrowserRouter(Routes);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
