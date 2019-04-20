const {join} = require('path');
const sources = {
  lib: join(__dirname, '../src/**/*.ts'),
  test: join(__dirname, '../test/**/*_test.ts')
};

module.exports = config => config.set({
  browsers: ['Firefox'],
  files: [sources.lib, sources.test],
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: [sources.lib, sources.test],
    reports: {lcovonly: {directory: join(__dirname, '../var'), filename: 'lcov.info', subdirectory: ''}},
    tsconfig: '../tsconfig.json'
  },
  logLevel: config.LOG_DEBUG,
  preprocessors: {'../**/*.ts': ['karma-typescript']},
  reporters: ['progress', 'karma-typescript'],
  singleRun: true
});
