import { z } from 'zod';
export declare const tweet: z.ZodObject<
  {
    id: z.ZodNumber;
    message: z.ZodString;
    likes: z.ZodNumber;
    createdAt: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    message: string;
    likes: number;
    createdAt: string;
    id: number;
  },
  {
    message: string;
    likes: number;
    createdAt: string;
    id: number;
  }
>;
