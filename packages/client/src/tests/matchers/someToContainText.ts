import { expect } from 'vitest';

expect.extend({
  someToContainText: (
    received: HTMLElement | HTMLElement[],
    expected: string,
  ) => {
    const hasText = (element: HTMLElement, text: string) => element.textContent?.includes(text) || false;
    const isSingular = !Array.isArray(received);
    const isPlural = Array.isArray(received);

    let pass = false;

    if (isSingular) {
      pass = hasText(received, expected);
    } else if (isPlural) {
      pass = (received).some((element: HTMLElement) => hasText(element, expected));
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
