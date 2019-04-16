const {join} = require('path');
const sources = {
  lib: join(__dirname, '../src/**/*.ts'),
  test: join(__dirname, '**/*_test.ts')
};

module.exports = config => config.set({
  browsers: ['FirefoxHeadless'],
  coverageReporter: {
    dir: join(__dirname, '../var'),
    subdir: '.',
    type: 'lcovonly'
  },
  files: [sources.lib],
  frameworks: ['mocha', 'karma-typescript'],
  karmaTypescriptConfig: {
    include: [sources.test],
    tsconfig: '../tsconfig.json'
  },
  plugins: [
    require('karma-coverage'),
    require('karma-firefox-launcher'),
    require('karma-mocha'),
    require('karma-typescript')
  ],
  preprocessors: {'../**/*.ts': ['karma-typescript']},
  reporters: ['progress', 'karma-typescript'],
  singleRun: true
});
