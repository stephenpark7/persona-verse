import { Home, Login, Signup, Dashboard, Profile } from '@pages';
import { Route, routeSchema } from '@schemas';
import { RouteWrapper } from './RouteWrapper';

export const Routes: Route[] = [
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

routeSchema.array().parse(Routes);
