import type { FC } from 'react';
import { ToastContainer, Bounce } from 'react-toastify';

export const Toast: FC = () => {
  return (
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
  );
};
