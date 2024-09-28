import { z } from 'zod';
import { contentSectionProps } from '@schemas';

export type ContentSectionProps = z.infer<typeof contentSectionProps>;

export type TweetContainerProps = z.infer<typeof tweetContainerProps>;
