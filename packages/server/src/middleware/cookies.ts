import session from 'express-session';

if (process.env.COOKIE_SECRET === undefined) {
  throw new Error('COOKIE_SECRET is not set');
}

if (process.env.COOKIE_MAX_AGE === undefined) {
  throw new Error('COOKIE_MAX_AGE is not set');
}

export const cookies = session({
  name: 'pv-session',
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE),
    domain: process.env.COOKIE_DOMAIN,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    signed: true,
  },
});
