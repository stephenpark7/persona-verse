export const userFactory = (overrides = {}) => {
  return {
    displayName: 'John Doe',
    ...overrides,
  };
};
