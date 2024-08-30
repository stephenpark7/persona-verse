import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  VITE_API_PROTOCOL: z.string().default('http'),
  VITE_API_HOST_NAME: z.string().default('localhost'),
  VITE_API_PORT: z
    .string()
    .transform((val) => parseInt(val))
    .default('3001'),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(import.meta.env);
