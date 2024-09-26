"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtToken = exports.jwt = exports.refreshToken = exports.accessToken = exports.jwtPayload = void 0;
const zod_1 = require("zod");
exports.jwtPayload = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    expiresAt: zod_1.z.number().optional(),
    jti: zod_1.z.string().optional(),
});
exports.accessToken = zod_1.z.object({
    token: zod_1.z.string(),
    expiresAt: zod_1.z.number(),
    payload: exports.jwtPayload,
});
exports.refreshToken = zod_1.z.object({
    token: zod_1.z.string(),
    expiresAt: zod_1.z.number(),
    payload: exports.jwtPayload,
});
exports.jwt = zod_1.z.object({
    token: zod_1.z.string(),
    expiresAt: zod_1.z.number(),
    payload: exports.jwtPayload,
});
exports.jwtToken = zod_1.z.union([exports.accessToken, exports.refreshToken]);
