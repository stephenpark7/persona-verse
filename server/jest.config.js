/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   '^.+.tsx?$': [ 'ts-jest',{} ],
  // },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  verbose: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  roots: [ '<rootDir>/src' ],
};
