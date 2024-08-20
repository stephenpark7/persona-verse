import '@testing-library/jest-dom/vitest';

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { tokenStorage } from '@utils';
import { mockJwt } from './mocks';

vi.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve<Response>(new Response(JSON.stringify({}), {
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
  })),
);

vi.spyOn(tokenStorage, 'getAccessToken').mockImplementation(() => mockJwt);

afterEach(() => {
  cleanup();
  localStorage.clear();
});
