const {join} = require('path');
const sources = [
  join(__dirname, '../src/**/*.ts'),
  join(__dirname, '../test/**/*_test.ts')
];

module.exports = config => config.set({
  browsers: ['FirefoxHeadless'],
  files: sources,
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: sources,
    reports: {lcovonly: {directory: join(__dirname, '../var'), filename: 'lcov.info', subdirectory: ''}},
    tsconfig: '../tsconfig.json'
  },
  logLevel: config.LOG_DEBUG,
  preprocessors: {'../**/*.ts': ['karma-typescript']},
  reporters: ['progress', 'karma-typescript'],
  singleRun: true
});
