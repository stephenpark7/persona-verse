"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = exports.postTweetResponse = exports.getTweetsResponse = exports.refreshTokenResponse = void 0;
const zod_1 = require("zod");
const tweet_1 = require("./tweet");
const jwt_1 = require("./jwt");
exports.refreshTokenResponse = zod_1.z.object({
    message: zod_1.z.string(),
    jwt: jwt_1.jwt,
});
exports.getTweetsResponse = zod_1.z.object({
    message: zod_1.z.string(),
    tweets: zod_1.z.array(tweet_1.tweet),
});
exports.postTweetResponse = zod_1.z.object({
    tweet: tweet_1.tweet,
});
exports.jsonResponse = zod_1.z
    .object({
    message: zod_1.z.string(),
})
    .extend(exports.refreshTokenResponse.partial().shape)
    .extend(exports.getTweetsResponse.partial().shape)
    .extend(exports.postTweetResponse.partial().shape);
