const sources = ['../src/**/*.ts', '../test/**/*_test.ts'];

module.exports = config => config.set({
  browsers: ['FirefoxHeadless'],
  files: sources,
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: sources,
    reports: {lcovonly: {directory: '../var', filename: 'lcov.info', subdirectory: ''}},
    tsconfig: '../tsconfig.json'
  },
  preprocessors: {'../**/*.ts': ['karma-typescript']},
  reporters: ['progress', 'karma-typescript'],
  singleRun: true
});
