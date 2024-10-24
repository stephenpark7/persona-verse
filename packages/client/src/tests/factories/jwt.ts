import { Jwt, jwtSchema } from '@schemas';

export const jwtFactory = (overrides = {}): Jwt => {
  return jwtSchema.parse({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSm9obiBEb2UifQ==',
    payload: {
      userId: 1,
      username: 'john-doe',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    },
    ...overrides,
  });
};
