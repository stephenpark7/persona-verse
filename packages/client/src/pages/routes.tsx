import { FC, ReactNode } from 'react';
import { MainLayout } from '@layouts';
import { Home, Login, Signup, Dashboard, Profile } from '@pages';
import { Route, routeSchema } from '@schemas';
import { Navbar } from '@components';

const layoutWrapper = (
  element: React.ReactNode,
  title: string,
  hideNavbar = false,
) => (
  <>
    {hideNavbar ? null : <Navbar />}
    <MainLayout title={title}>{element}</MainLayout>
  </>
);

interface RouteProps {
  element: ReactNode;
}

const PrivateRoute: FC<RouteProps> = ({ element }) => {
  return <>{element}</>;
};

const PublicRoute: FC<RouteProps> = ({ element }) => {
  return <>{element}</>;
};

export const routes: Route[] = [
  {
    path: '/signup',
    element: <Signup />,
    title: 'PersonaVerse - Sign up',
    hideNavbar: true,
    private: false,
  },
  {
    path: '/login',
    element: <Login />,
    title: 'PersonaVerse - Log in',
    hideNavbar: true,
    private: false,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    title: 'PersonaVerse - Dashboard',
    private: true,
  },
  {
    path: '/profile',
    element: <Profile />,
    title: 'PersonaVerse - Profile',
    private: true,
  },
  {
    path: '/',
    element: <Home />,
    title: 'PersonaVerse',
    hideNavbar: true,
    private: false,
  },
].map((route) => {
  route.element = layoutWrapper(
    route.private ? (
      <PrivateRoute element={route.element} />
    ) : (
      <PublicRoute element={route.element} />
    ),
    route.title,
    route.hideNavbar,
  );
  return route;
});

routeSchema.array().parse(routes);
