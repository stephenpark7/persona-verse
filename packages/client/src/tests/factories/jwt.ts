import { jwtSchema } from '@schemas';

export const jwtFactory = (overrides = {}) => {
  return jwtSchema.parse({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSm9obiBEb2UifQ==',
    expiresAt: Date.now() + 1000,
    payload: {
      userId: 1,
      username: 'john-doe',
    },
    ...overrides,
  });
};
