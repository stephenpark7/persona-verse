import 'vitest';

declare module 'vitest' {
  interface Assertion {
    toHaveSomeTextContent: (string) => boolean;
  }
}
