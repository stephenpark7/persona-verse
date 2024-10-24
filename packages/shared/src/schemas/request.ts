import { z } from 'zod';
import type { Request } from 'express';

export const request = z.custom<Request>();

export const authenticatedRequest = z.custom<Request>();
