'use strict';
const {spawn} = require('child_process');
const del = require('del');
const {promises} = require('fs');
const {dest, parallel, series, src, task, watch} = require('gulp');
const rename = require('gulp-rename');
const {delimiter, normalize, resolve} = require('path');

// Initialize the build system.
const _path = 'PATH' in process.env ? process.env.PATH : '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/**
 * The file patterns providing the list of source files.
 * @type {string[]}
 */
const sources = ['*.js', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

/**
 * Builds the project.
 */
task('build:browser', async () => {
  await _exec('rollup', ['--config']);
  return _exec('minify', ['build/enum.js', '--out-file=build/enum.min.js']);
});

task('build:cjs', () => _exec('tsc'));
task('build:esm', () => _exec('tsc', ['--project', 'src/tsconfig.json']));
task('build:rename', () => src('lib/**/*.js').pipe(rename({extname: '.mjs'})).pipe(dest('lib')));
task('build', series('build:esm', 'build:rename', 'build:cjs', 'build:browser'));

/**
 * Deletes all generated files and reset any saved state.
 */
task('clean', () => del(['.nyc_output', 'build', 'coverage', 'doc/api', 'lib', 'var/**/*', 'web']));

/**
 * Uploads the results of the code coverage.
 */
task('coverage', () => _exec('coveralls', ['var/lcov.info']));

/**
 * Builds the documentation.
 */
task('doc', async () => {
  await promises.copyFile('CHANGELOG.md', 'doc/about/changelog.md');
  await promises.copyFile('LICENSE.md', 'doc/about/license.md');
  await _exec('typedoc');
  return _exec('mkdocs', ['build']);
});

/**
 * Fixes the coding standards issues.
 */
task('fix', () => _exec('tslint', ['--fix', ...sources]));

/**
 * Performs the static analysis of source code.
 */
task('lint', () => _exec('tslint', sources));

/**
 * Starts the development server.
 */
task('serve', () => _exec('http-server', ['example', '-o']));

/**
 * Runs the test suites.
 */
task('test:browser', () => _exec('karma', ['start']));
task('test:node', () => _exec('nyc', [normalize('node_modules/.bin/mocha'), 'test/**/*.ts']));
task('test', parallel('test:browser', 'test:node'));

/**
 * Upgrades the project to the latest revision.
 */
task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install', '--ignore-scripts']);
  return _exec('npm', ['update', '--dev']);
});

/**
 * Watches for file changes.
 */
task('watch', () => {
  watch('src/**/*.ts', {ignoreInitial: false}, task('build'));
  watch('test/**/*.ts', task('test:node'));
});

/**
 * Runs the default tasks.
 */
task('default', task('build'));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {Partial<SpawnOptions>} [options] The settings to customize how the process is spawned.
 * @return {Promise<void>} Completes when the command is finally terminated.
 */
function _exec(command, args = [], options = {}) {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, Object.assign({shell: true, stdio: 'inherit'}, options))
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
