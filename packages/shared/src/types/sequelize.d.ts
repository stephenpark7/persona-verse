import { z } from 'zod';
import { sequelizeOptionsSchema } from '@shared/schemas';

export type SequelizeOptions = z.infer<typeof sequelizeOptionsSchema>;
