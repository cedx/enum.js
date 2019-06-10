const {join} = require('path');
const sources = [join(__dirname, '../lib/**/*.js'), join(__dirname, '../test/**/*_test.ts')];

module.exports = config => config.set({
  browsers: ['FirefoxHeadless'],
  files: sources,
  frameworks: ['mocha'],
  reporters: ['progress'],
  singleRun: true
});
