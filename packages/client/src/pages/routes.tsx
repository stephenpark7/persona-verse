import { MainLayout } from '@layouts';
import { Home, Login, Signup, Dashboard, Profile } from '@pages';
import { Route, routeSchema } from '@schemas';
import { Navbar } from '@components';

// TODO: add public and private routes
// for Dashboard and Profile

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
  },
  {
    path: '/profile',
    element: <Profile />,
    title: 'PersonaVerse - Profile',
  },
  {
    path: '/',
    element: <Home />,
    title: 'PersonaVerse',
    hideNavbar: true,
  },
].map((route) => {
  route.element = layoutWrapper(route.element, route.title, route.hideNavbar);
  return route;
});

routeSchema.array().parse(routes);
