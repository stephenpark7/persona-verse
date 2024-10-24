import { Exception } from './exception';

export const assertIsError: (error: unknown) => asserts error is Error = (
  error: unknown,
): asserts error is Error => {
  if (!(error instanceof Error)) {
    throw error;
  }
};

export const assertIsException: (
  error: unknown,
) => asserts error is Exception = (
  error: unknown,
): asserts error is Exception => {
  if (!(error instanceof Exception)) {
    throw error;
  }
};
