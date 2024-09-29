import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MainLayout } from '@layouts';
import { useUserState } from '@hooks';
import { Navbar } from '@components';

interface RouteWrapperProps {
  children: ReactNode;
  title: string;
  hideNavbar?: boolean;
  isPrivate?: boolean;
  redirect?: string;
}

interface RouteProps {
  element: ReactNode;
}

const PrivateRoute: FC<RouteProps> = ({ element }) => {
  return <>{element}</>;
};

const PublicRoute: FC<RouteProps> = ({ element }) => {
  return <>{element}</>;
};

export const RouteWrapper: FC<RouteWrapperProps> = ({
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
