export const responseFactory = (overrides = {}) => ({
  status: 200,
  statusText: 'OK',
  headers: new Headers(),
  ...overrides,
});
