import React, { useLayoutEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@layouts';
import { routes } from '@pages';

export const router = createBrowserRouter(routes);

export const Router: React.FC = () => {
  const routeId = parseInt(router.state.matches[0].route.id);
  const pageTitle = routes[routeId].title;
  console.log(routes);

  // useLayoutEffect(() => {
  //   console.log(router);
  // }, [router]);

  return <RouterProvider router={router} />;
};
