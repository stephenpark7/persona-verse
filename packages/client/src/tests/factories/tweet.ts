import moment from 'moment';

export const tweetFactory = (overrides = {}) => {
  const tweet = {
    id: 0,
    message: 'Hello, world!',
    createdAt: new Date().toISOString(),
    date: moment(new Date().toISOString(), 'YYYY-MM-DD').format('MMM D'),
    User: {
      username: 'test_user',
    },
  };

  return {
    ...tweet,
    ...overrides,
  };
};
