import React, { ReactNode } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContextProvider } from './contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = (): ReactNode => {
  const pages: RouteObject[] = [
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <Home />,
    },
  ];
  
  const router = createBrowserRouter(pages);

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </UserContextProvider>
  );
};

export default App;