/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.test.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      transformerConfig: {
        transformIgnorePatterns: [
          '<rootDir>/build/',
          '<rootDir>/dist/',
          '<rootDir>/node_modules/',
          '<rootDir>/scripts/',
        ],
      },
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/scripts/',
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  // setupFiles: [ '<rootDir>/src/tests/setupTests.ts' ],
  // setupFilesAfterEnv: ["<rootDir>/jest-setup-after-env.js"],
  // moduleFileExtensions: [ 'js', 'jsx', 'ts', 'tsx', ],
  // moduleDirectories: [ 'node_modules', 'build', 'dist', ],
  // verbose: true, // true
  // testPathIgnorePatterns: [
  //   'build/',
  //   'node_modules/',
  //   'dist/',
  // ],
  // roots: [ '<rootDir>/src' ],
  // transform: {},
  // extensionsToTreatAsEsm: [ '.tsx', '.ts' ],
  // transform: {
  //   '^.+.tsx?$': [ 'ts-jest',{} ],
  // },
  // collectCoverage: true,
  // coverageDirectory: 'coverage',
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
};
