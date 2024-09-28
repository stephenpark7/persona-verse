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
  redirect?: string;
}

const RouteWrapper: FC<RouteWrapperProps> = ({
  children,
  title,
  hideNavbar = false,
  isPrivate = false,
  redirect,
}) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserState();

  useEffect(() => {
    const checkAuth = async () => {
      if (isPrivate && !isLoggedIn) {
        navigate('/login');
        toast.error('You must be logged in to access this page.');
      }
    };

    const checkRedirect = async () => {
      if (isLoggedIn && redirect) {
        navigate(redirect);
      }
    };

    const timeout = setTimeout(() => {
      checkAuth();
      checkRedirect();
    }, 0);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, navigate]);

  const renderRoute = () => {
    if ((isPrivate && !isLoggedIn) || (isLoggedIn && redirect)) {
      return <p data-testid="paragraph">Redirecting...</p>;
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
    redirect: '/dashboard',
  },
  {
    path: '/login',
    element: <Login />,
    title: 'PersonaVerse - Log in',
    hideNavbar: true,
    redirect: '/dashboard',
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
    redirect: '/dashboard',
  },
].map((route) => {
  route.element = (
    <RouteWrapper
      title={route.title}
      hideNavbar={route.hideNavbar}
      isPrivate={route.private}
      redirect={route.redirect}
    >
      {route.element}
    </RouteWrapper>
  );
  return route;
});

routeSchema.array().parse(routes);
