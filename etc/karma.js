const {join} = require('path');
const sources = ['src/**/*.ts', 'test/**/*_test.ts'];

module.exports = config => config.set({
  basePath: join(__dirname, '..'),
  browsers: ['FirefoxHeadless'],
  files: sources,
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    coverageOptions: {exclude: /_test\.ts$/i},
    include: sources,
    reports: {lcovonly: {directory: '..', filename: 'lcov.info', subdirectory: 'var'}},
    tsconfig: 'tsconfig.json'
  },
  preprocessors: {'**/*.ts': ['karma-typescript']},
  reporters: ['progress', 'karma-typescript'],
  singleRun: true
});
