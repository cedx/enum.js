import {spawn, SpawnOptions} from 'child_process';
import * as del from 'del';
import {promises} from 'fs';
import * as gulp from 'gulp';
import {Gulpclass, SequenceTask, Task} from 'gulpclass';
import {delimiter, normalize, resolve} from 'path';

/**
 * Provides tasks for the build system.
 */
@Gulpclass() export class GulpFile {

  /**
   * The file patterns providing the list of source files.
   */
  readonly sources: string[] = ['*.ts', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

  /**
   * Creates a new task runner.
   */
  constructor() {
    const path = 'PATH' in process.env ? process.env.PATH! : '';
    const vendorDir = resolve('node_modules/.bin');
    if (!path.includes(vendorDir)) process.env.PATH = `${vendorDir}${delimiter}${path}`;
  }

  /**
   * Runs the default tasks.
   */
  @Task('default') defaultTask(): gulp.TaskFunction {
    return gulp.task('build');
  }

  /**
   * Builds the project.
   */
  @Task() build(): Promise<void> {
    return this._exec('tsc');
  }

  /**
   * Deletes all generated files and reset any saved state.
   */
  @Task() clean(): Promise<string[]> {
    return del(['.nyc_output', 'doc/api', 'lib', 'var/**/*', 'web']);
  }

  /**
   * Uploads the results of the code coverage.
   */
  @Task() coverage(): Promise<void> {
    return this._exec('coveralls', ['var/lcov.info']);
  }

  /**
   * Builds the documentation.
   */
  @SequenceTask() doc(): string[] {
    return ['doc:api', 'doc:web'];
  }

  /**
   * Builds the API reference.
   */
  @Task('doc:api') docApi(): Promise<void> {
    return this._exec('typedoc');
  }

  /**
   * Builds the user guide.
   */
  @Task('doc:web') async docWeb(): Promise<void> {
    await promises.copyFile('CHANGELOG.md', 'doc/about/changelog.md');
    await promises.copyFile('LICENSE.md', 'doc/about/license.md');
    return this._exec('mkdocs', ['build']);
  }

  /**
   * Fixes the coding standards issues.
   */
  @Task() fix(): Promise<void> {
    return this._exec('tslint', ['--fix', ...this.sources]);
  }

  /**
   * Performs the static analysis of source code.
   */
  @Task() lint(): Promise<void> {
    return this._exec('tslint', this.sources);
  }

  /**
   * Runs the test suites.
   */
  @Task() test(): Promise<void> {
    return this._exec('nyc', [normalize('node_modules/.bin/mocha')]);
  }

  /**
   * Upgrades the project to the latest revision.
   */
  @Task() async upgrade(): Promise<void> {
    await this._exec('git', ['reset', '--hard']);
    await this._exec('git', ['fetch', '--all', '--prune']);
    await this._exec('git', ['pull', '--rebase']);
    await this._exec('npm', ['install', '--ignore-scripts']);
    return this._exec('npm', ['update', '--dev']);
  }

  /**
   * Watches for file changes.
   */
  @Task() watch(): void {
    gulp.watch('src/**/*.ts', {ignoreInitial: false}, gulp.task('build'));
    gulp.watch('test/**/*.ts', gulp.task('test'));
  }

  /**
   * Spawns a new process using the specified command.
   * @param command The command to run.
   * @param args The command arguments.
   * @param options The settings to customize how the process is spawned.
   * @return Completes when the command is finally terminated.
   */
  private _exec(command: string, args: string[] = [], options: SpawnOptions = {}): Promise<void> {
    return new Promise((fulfill, reject) => spawn(normalize(command), args, Object.assign({shell: true, stdio: 'inherit'}, options))
      .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
    );
  }
}
