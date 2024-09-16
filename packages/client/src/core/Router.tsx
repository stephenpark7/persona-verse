import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@pages';

export const router = createBrowserRouter(routes);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
