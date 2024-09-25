export const userFactory = (overrides = {}) => {
  return {
    // id: 0,
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'hashedpassword',
    ...overrides,
  };
};
