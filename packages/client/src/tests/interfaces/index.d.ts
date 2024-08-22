import 'vitest';

interface CustomMatchers<R = unknown> {
  someToContainText(elements: HTMLElement[], text: string): R;
}

declare module 'vitest' {
  interface Assertion<T = unknown> extends CustomMatchers<T> {
    someToContainText: (string: string) => boolean;
  }
}
