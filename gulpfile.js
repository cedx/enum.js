'use strict';

const {david} = require('@cedx/gulp-david');
const {spawn} = require('child_process');
const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const {normalize} = require('path');

/**
 * Runs the default tasks.
 */
gulp.task('default', ['test']);

/**
 * Deletes all generated files and reset any saved state.
 */
gulp.task('clean', () => del(['.nyc_output', 'var/**/*']));

/**
 * Sends the results of the code coverage.
 */
gulp.task('coverage', ['test'], () => _exec('node_modules/.bin/coveralls', ['var/lcov.info']));

/**
 * Checks the package dependencies.
 */
gulp.task('deps', ['deps:outdated', 'deps:security']);
gulp.task('deps:outdated', () => gulp.src('package.json').pipe(david()));
gulp.task('deps:security', () => _exec('node_modules/.bin/nsp', ['check']));

/**
 * Builds the documentation.
 */
gulp.task('doc', async () => {
  await del('doc/api');
  return _exec('node_modules/.bin/esdoc');
});

/**
 * Fixes the coding standards issues.
 */
gulp.task('fix', () => gulp.src(['*.js', 'lib/**/*.js', 'test/**/*.js'], {base: '.'})
  .pipe(eslint({fix: true}))
  .pipe(gulp.dest('.'))
);

/**
 * Performs static analysis of source code.
 */
gulp.task('lint', () => gulp.src(['*.js', 'lib/**/*.js', 'test/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
);

/**
 * Runs the unit tests.
 */
gulp.task('test', () => _exec('node_modules/.bin/nyc', [normalize('node_modules/.bin/mocha')]));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {object} [options] The settings to customize how the process is spawned.
 * @return {Promise} Completes when the command is finally terminated.
 */
async function _exec(command, args = [], options = {shell: true, stdio: 'inherit'}) {
  return new Promise((resolve, reject) => spawn(normalize(command), args, options)
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : resolve())
  );
}
