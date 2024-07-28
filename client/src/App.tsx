import React from 'react';
import { Provider, Router, Toast } from './core';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = (): React.JSX.Element => {
  return (
    <Provider>
      <Router />
      <Toast />
    </Provider>
  );
};

export default App;
