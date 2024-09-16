import { z } from 'zod';

export const browserStateProps = z.object({
  docTitle: z.string(),
});

export const browserState = z.object({
  value: browserStateProps,
});

export const browser = z.object({
  browser: browserState,
});

export type Browser = z.infer<typeof browser>;
export type BrowserState = z.infer<typeof browserState>;
