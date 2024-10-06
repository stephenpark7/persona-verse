import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const render = () => {
  const root = document.getElementById('root') as HTMLElement;

  if (root) {
    const rootElement = createRoot(root);

    const children = (
      <StrictMode>
        <App />
      </StrictMode>
    );

    rootElement.render(children);
  } else {
    throw new Error('Root element not found');
  }
};

render();
