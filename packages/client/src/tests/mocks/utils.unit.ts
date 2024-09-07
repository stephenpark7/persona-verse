// vi.mock('@utils', async (importOriginal) => {
//   return {
//     ...(await importOriginal<typeof import('@utils')>()),
//     apiConfig: {
//       urlWithParams: vi.fn(),
//       trpcUrl: 'mocked-trpc-url',
//     },
//     tokenStorage: {
//       getAccessToken: vi.fn(),
//     },
//   };
// });
