import { vi } from 'vitest';
import axios from 'axios';
import { responseFactory } from '../factories';

export const responseSpy = vi
  .spyOn(axios, 'request')
  .mockReturnValue(Promise.resolve(responseFactory()));
