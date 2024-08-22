import '@testing-library/jest-dom/vitest';

import { vi, expect } from 'vitest';
import axios from 'axios';

const response = new Response(JSON.stringify({}), {
  status: 200,
  statusText: 'OK',
  headers: new Headers(),
});

vi.spyOn(axios, 'request').mockReturnValue(Promise.resolve(response));

expect.extend({
  toHaveSomeTextContent(received, expected) {
    const hasText = (element: HTMLElement, text: string) => element.textContent?.includes(text) || false;
    const isSingular = received.textContent !== undefined;
    const isPlural = Array.isArray(received);

    let pass = false;

    if (isSingular) {
      pass = hasText(received, expected);
    } else if (isPlural) {
      pass = received.some((element: HTMLElement) => hasText(element, expected));
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