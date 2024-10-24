import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/client',
  'packages/server', // TODO: fileParallelism: false doesn't work if npm test is run in root dir, but works if run in server dir
  // https://github.com/vitest-dev/vitest/issues/5933
]);
