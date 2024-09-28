import { z } from 'zod';

// TODO: make width/height a number

export const buttonProps = z.object({
  name: z.string(),
  type: z.enum(['button', 'submit', 'reset']).optional(),
  onClick: z.function().optional(),
  children: z.string(),
  overrideCSS: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  link: z.string().optional(),
});
