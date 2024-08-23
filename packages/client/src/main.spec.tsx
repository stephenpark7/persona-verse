import { describe, it, expect } from 'vitest';
import { waitFor } from '@testing-library/react';

import ReactDOM from 'react-dom/client';

describe('main.tsx', async () => {
  it('should render the App component', async () => {
    await expect(async () => {
      await import('./main');
    }).not.toThrowError();

    const createRoot = vi.spyOn(ReactDOM, 'createRoot');

    waitFor(() => {
      expect(createRoot).toHaveBeenCalled();
    }, { timeout: 1000 });

    createRoot.mockRestore();
  });

  it('should throw an error if root element is not found', async () => {
    const root = document.getElementById('root');
    if (root) {
      document.body.removeChild(root);
    }

    expect(async () => {
      await import('./main');
    }).rejects.toThrowError('Root element not found');
  });
});
