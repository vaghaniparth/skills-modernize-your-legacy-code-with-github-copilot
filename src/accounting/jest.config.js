export default {
  testEnvironment: 'node',
  transform: {},
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: [
    '**/test/**/*.test.js',
    '**/*.test.js'
  ],
  collectCoverageFrom: [
    'index.js',
    '!**/node_modules/**',
    '!**/test/**'
  ]
};
