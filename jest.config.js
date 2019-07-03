module.exports = {
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/dist'],
  moduleNameMapper: {
    '@voyacode/(.*)': '<rootDir>/src/app/$1'
  },
  testMatch: ['**/src/**/*.spec.ts']
};
