import { User } from '@db/models';
import { createTweet, getTweets } from './tweet';
import { authenticatedRequestFactory } from '@tests/factories';

describe('Tweet Controller', () => {
  let userId: number;

  beforeAll(async () => {
    const user = await User.create({
      username: 'test',
      email: 'test@test.com',
      password: 'password',
    });

    userId = user.getDataValue('id');
  });

  describe('createTweet', () => {
    it('creates a new tweet', async () => {
      const req = authenticatedRequestFactory({
        userId,
        body: { message: 'Hello, world!' },
      });
      const res = await createTweet(req);
      expect(res).toHaveProperty('message', 'Tweet posted.');
      expect(res).toHaveProperty('tweet');
      expect(res.tweet).toHaveProperty('message', 'Hello, world!');
      expect(res.tweet).toHaveProperty('likes', 0);
      expect(res.tweet).toHaveProperty('createdAt');
    });
  });

  describe('getTweets', () => {
    it('gets all tweets for a user', async () => {
      const req = authenticatedRequestFactory({
        userId,
      });
      const res = await getTweets(req);
      expect(res).toHaveProperty('message', 'Tweets retrieved.');
      expect(res).toHaveProperty('tweets');
      expect(res.tweets).toHaveLength(1);
    });
  });
});
