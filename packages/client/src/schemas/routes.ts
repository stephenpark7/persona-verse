import { z } from 'zod';

export const routeSchema = z.object({
  path: z.string(),
  element: z.custom<React.ReactNode>(),
  title: z.string(),
});

export type Route = z.infer<typeof routeSchema>;
