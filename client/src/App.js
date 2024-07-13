import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { UserContextWrapper } from './contexts/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const pages = [
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

export default function App() {
  return (
    <UserContextWrapper>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserContextWrapper>
  );
}
