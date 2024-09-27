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
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }, {
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        expiresAt: number;
        token: string;
        payload: {
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    }, {
        expiresAt: number;
        token: string;
        payload: {
            username: string;
            userId: number;
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
            username: string;
            userId: number;
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
            username: string;
            userId: number;
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
        likes: number;
        createdAt: string;
        id: number;
    }, {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    message: string;
    tweets: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }[];
}, {
    message: string;
    tweets: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
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
        likes: number;
        createdAt: string;
        id: number;
    }, {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }>;
}, "strip", z.ZodTypeAny, {
    tweet: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    };
}, {
    tweet: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
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
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }, {
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        expiresAt: number;
        token: string;
        payload: {
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    }, {
        expiresAt: number;
        token: string;
        payload: {
            username: string;
            userId: number;
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
        likes: number;
        createdAt: string;
        id: number;
    }, {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }>, "many">>;
}>, {
    tweet: z.ZodOptional<z.ZodObject<{
        id: z.ZodNumber;
        message: z.ZodString;
        likes: z.ZodNumber;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }, {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }>>;
}>, "strip", z.ZodTypeAny, {
    message?: string | undefined;
    jwt?: {
        expiresAt: number;
        token: string;
        payload: {
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    } | undefined;
    tweets?: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }[] | undefined;
    tweet?: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    } | undefined;
}, {
    message?: string | undefined;
    jwt?: {
        expiresAt: number;
        token: string;
        payload: {
            username: string;
            userId: number;
            expiresAt?: number | undefined;
            jti?: string | undefined;
        };
    } | undefined;
    tweets?: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    }[] | undefined;
    tweet?: {
        message: string;
        likes: number;
        createdAt: string;
        id: number;
    } | undefined;
}>;
