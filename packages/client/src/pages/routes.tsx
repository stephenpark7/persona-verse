import { MainLayout } from '@layouts';
import { Home, Login, Signup, Dashboard } from '@pages';
import { Route, routeSchema } from '@schemas';
import { Navbar } from '@components';

// TODO: redirect to /dashboard if user is logged in

const layoutWrapper = (element: React.ReactNode, title: string) => (
  <>
    <Navbar />
    <MainLayout title={title}>{element}</MainLayout>
  </>
);

export const routes: Route[] = [
  {
    path: '/signup',
    element: <Signup />,
    title: 'PersonaVerse - Sign up',
  },
  {
    path: '/login',
    element: <Login />,
    title: 'PersonaVerse - Log in',
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    title: 'PersonaVerse - Dashboard',
  },
  {
    path: '/',
    element: <Home />,
    title: 'PersonaVerse',
  },
].map((route) => {
  route.element = layoutWrapper(route.element, route.title);
  return route;
});

routeSchema.array().parse(routes);
