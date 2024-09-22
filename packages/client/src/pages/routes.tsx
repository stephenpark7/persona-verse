import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MainLayout } from '@layouts';
import { Home, Login, Signup, Dashboard, Profile } from '@pages';
import { Route, routeSchema } from '@schemas';
import { Navbar } from '@components';
import { useUserState } from '@hooks';

interface RouteWrapperProps {
  children: ReactNode;
  title: string;
  hideNavbar?: boolean;
  isPrivate?: boolean;
}

const RouteWrapper: FC<RouteWrapperProps> = ({
  children,
  title,
  hideNavbar = false,
  isPrivate = false,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserState();

  useEffect(() => {
    if (isPrivate && !isLoggedIn) {
      toast.error('You must be logged in to view this page.');
      navigate('/login');
    }
  }, [isLoggedIn]);

  const renderRoute = () => {
    if (isPrivate && !isLoggedIn) {
      return <p>Redirecting...</p>;
    }

    return isPrivate && isLoggedIn ? (
      <PrivateRoute element={children} />
    ) : (
      <PublicRoute element={children} />
    );
  };

  return (
    <>
      {hideNavbar ? null : <Navbar />}
      <MainLayout title={title}>{renderRoute()}</MainLayout>
    </>
  );
};

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
  },
  {
    path: '/login',
    element: <Login />,
    title: 'PersonaVerse - Log in',
    hideNavbar: true,
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
  route.element = (
    <RouteWrapper
      title={route.title}
      hideNavbar={route.hideNavbar}
      isPrivate={route.private}
    >
      {route.element}
    </RouteWrapper>
  );
  return route;
});

routeSchema.array().parse(routes);
