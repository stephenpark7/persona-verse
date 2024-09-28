import { z } from 'zod';
import { buttonProps } from '@schemas';

export type ButtonProps = z.infer<typeof buttonProps>;
