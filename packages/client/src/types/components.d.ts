import { z } from 'zod';
import { contentSectionProps } from '@schemas';

export type ContentSectionProps = z.infer<typeof contentSectionProps>;
