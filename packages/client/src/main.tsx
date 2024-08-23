import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const render = () => {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found');
  }

  const rootElement = ReactDOM.createRoot(root);

  const children = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  rootElement.render(children);
};

render();
