import cookieSession from 'cookie-session';

if (process.env.COOKIE_SECRET === undefined) {
  throw new Error('COOKIE_SECRET is not set');
}

if (process.env.COOKIE_MAX_AGE === undefined) {
  throw new Error('COOKIE_MAX_AGE is not set');
}

const cookies = cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SECRET,
  maxAge: parseInt(process.env.COOKIE_MAX_AGE),
  path: '/',
  domain: process.env.COOKIE_DOMAIN,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  signed: true,
  overwrite: true,
});

export { cookies };
