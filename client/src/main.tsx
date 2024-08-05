import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './core';

const render = () => {
  const root: HTMLElement = document.getElementById('root') as HTMLElement;

  const rootElement: ReactDOM.Root = ReactDOM.createRoot(root);

  const children: React.ReactNode = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  rootElement.render(children);
};

render();
