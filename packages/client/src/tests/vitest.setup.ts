import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import axios from 'axios';

const response = new Response(JSON.stringify({}), {
  status: 200,
  statusText: 'OK',
  headers: new Headers(),
});

export const axiosRequestSpy = vi.spyOn(axios, 'request').mockReturnValue(Promise.resolve(response));

afterEach(() => {
  cleanup();
});
