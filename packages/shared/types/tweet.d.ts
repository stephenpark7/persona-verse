import type { InferType } from '.';
import { tweet } from './schemas';

export type Tweet = InferType<typeof tweet>;
