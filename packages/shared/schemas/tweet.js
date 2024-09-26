"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweet = void 0;
const zod_1 = require("zod");
exports.tweet = zod_1.z.object({
    id: zod_1.z.number(),
    message: zod_1.z.string(),
    likes: zod_1.z.number(),
    createdAt: zod_1.z.string(),
});
