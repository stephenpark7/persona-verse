import { z } from 'zod';

export const RouteSchema = z.object({
  path: z.string(),
  element: z.custom<React.ReactNode>(),
  title: z.string(),
});

export type Route = z.infer<typeof RouteSchema>;
