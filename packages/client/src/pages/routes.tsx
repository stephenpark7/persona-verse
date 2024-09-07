import { MainLayout } from '@layouts';
import { Home, Login, Signup } from '@pages';
import { Route, RouteSchema } from '@schemas';

const layoutWrapper = (element: React.ReactNode, title: string) => (
  <MainLayout title={title}>{element}</MainLayout>
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
    path: '/',
    element: <Home />,
    title: 'PersonaVerse',
  },
].map((route) => {
  route.element = layoutWrapper(route.element, route.title);
  return route;
});

RouteSchema.array().parse(routes);
