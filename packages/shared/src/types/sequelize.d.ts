import { z } from 'zod';
import { sequelizeOptionsSchema } from '@schemas';

export type SequelizeOptions = z.infer<typeof sequelizeOptionsSchema>;
