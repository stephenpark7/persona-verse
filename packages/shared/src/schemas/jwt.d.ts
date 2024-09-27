import { z } from 'zod';
export declare const jwtPayload: z.ZodObject<{
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
export declare const accessToken: z.ZodObject<{
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
export declare const refreshToken: z.ZodObject<{
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
export declare const jwt: z.ZodObject<{
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
export declare const jwtToken: z.ZodUnion<[z.ZodObject<{
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
}>, z.ZodObject<{
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
}>]>;
