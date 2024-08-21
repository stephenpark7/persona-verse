import '@testing-library/jest-dom/vitest';

import { vi, expect } from 'vitest';
import axios from 'axios';

const response = new Response(JSON.stringify({}), {
  status: 200,
  statusText: 'OK',
  headers: new Headers(),
});

export const axiosRequestSpy = vi.spyOn(axios, 'request').mockReturnValue(Promise.resolve(response));

expect.extend({
  toHaveSomeText(received, expected) {

    const isSingular = received.textContent?.length > 0;
    const isPlural = received.length > 0;

    let pass = false;

    if (isSingular || isPlural) {
      pass = isSingular ? received.textContent.length > 0 : received.some((element: HTMLElement) => element.textContent?.includes(expected)); 
    }

    if (pass) {
      return {
        message: () => `expected ${received} to not have ${expected} text`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have ${expected} text`,
        pass: false,
      };
    }
  },
});