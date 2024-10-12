import { z } from 'zod';
import type { Options } from 'sequelize';

export const sequelizeOptionsSchema = z.custom<Options>();
