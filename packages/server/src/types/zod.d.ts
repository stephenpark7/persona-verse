import { z } from 'zod';

export type InferType<T> = z.infer<T>;
