import { z } from 'zod';
export declare const tweet: z.ZodObject<{
    id: z.ZodNumber;
    message: z.ZodString;
    likes: z.ZodNumber;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    id: number;
    likes: number;
    createdAt: string;
}, {
    message: string;
    id: number;
    likes: number;
    createdAt: string;
}>;
