import {
  fireEvent as origFireEvent,
  waitFor as origWaitFor,
} from '@testing-library/react';

export const fireEvent = origFireEvent;

export const waitFor = origWaitFor;
