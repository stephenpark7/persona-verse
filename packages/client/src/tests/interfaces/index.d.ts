import 'vitest';

declare module 'vitest' {
  interface Assertion {
    toHaveSomeText: (string) => boolean;
  }
}
