import { z } from 'zod';
export declare const refreshTokenResponse: z.ZodObject<{
    message: z.ZodString;
    jwt: z.ZodObject<{
        token: z.ZodString;
        expiresAt: z.ZodNumber;
        payload: z.ZodObject<{
            userId: z.ZodNumber;
            username: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodNumber>;
            jti: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }, {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    }, {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    message: string;
    jwt: {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    };
}, {
    message: string;
    jwt: {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    };
}>;
export declare const getTweetsResponse: z.ZodObject<{
    message: z.ZodString;
    tweets: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    message: string;
    tweets: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    }[];
}, {
    message: string;
    tweets: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    }[];
}>;
export declare const postTweetResponse: z.ZodObject<{
    tweet: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    tweet: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    };
}, {
    tweet: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    };
}>;
export declare const jsonResponse: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    message: z.ZodString;
}, {
    message: z.ZodOptional<z.ZodString>;
    jwt: z.ZodOptional<z.ZodObject<{
        token: z.ZodString;
        expiresAt: z.ZodNumber;
        payload: z.ZodObject<{
            userId: z.ZodNumber;
            username: z.ZodString;
            expiresAt: z.ZodOptional<z.ZodNumber>;
            jti: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }, {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    }, {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    }>>;
}>, {
    message: z.ZodOptional<z.ZodString>;
    tweets: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}>, {
    tweet: z.ZodOptional<z.ZodObject<{
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
    }>>;
}>, "strip", z.ZodTypeAny, {
    message?: string | undefined;
    jwt?: {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    } | undefined;
    tweets?: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    }[] | undefined;
    tweet?: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    } | undefined;
}, {
    message?: string | undefined;
    jwt?: {
        expiresAt: number;
        token: string;
        payload: {
            userId: number;
            username: string;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    } | undefined;
    tweets?: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    }[] | undefined;
    tweet?: {
        message: string;
        id: number;
        likes: number;
        createdAt: string;
    } | undefined;
}>;
