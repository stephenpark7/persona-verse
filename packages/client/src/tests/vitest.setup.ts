import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

vi.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve<Response>(new Response(JSON.stringify({}), {
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
  })),
);

afterEach(() => {
  cleanup();
});
