export const isAuthHeaderRequired = (url: string) => {
  // URLs that don't require an auth header
  const whitelistedUrls = [
    '/registerUser',
    '/loginUser',
    '/refreshJwt',
    '/logoutUser',
  ];

  return !whitelistedUrls.some((u) => url.startsWith(u));
};
