# Changelog

## Version [6.3.0](https://github.com/cedx/enum.js/compare/v6.2.0...v6.3.0)
- Updated the package dependencies.

## Version [6.2.0](https://github.com/cedx/enum.js/compare/v6.1.1...v6.2.0)
- Added [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) to the values to be retained. 
- Replaced [`babel-minify`](https://github.com/babel/minify) by [`terser`](https://terser.org) for minification.

## Version [6.1.1](https://github.com/cedx/enum.js/compare/v6.1.0...v6.1.1)
- Fixed the [issue #4](https://github.com/cedx/enum.js/issues/4): [Microsoft Edge](https://www.microsoft.com/en-us/windows/microsoft-edge) does not support object spread properties.

## Version [6.1.0](https://github.com/cedx/enum.js/compare/v6.0.0...v6.1.0)
- Added support for [TypeScript enums](https://www.typescriptlang.org/docs/handbook/enums.html).
- Due to strong user demand, restored the [TypeScript](https://www.typescriptlang.org) source code.
- Raised the [Node.js](https://nodejs.org) constraint.
- Replaced the [JSDoc](https://jsdoc.app) documentation generator by [TypeDoc](https://typedoc.org).

## Version [6.0.0](https://github.com/cedx/enum.js/compare/v5.5.0...v6.0.0)
- Breaking change: dropped support for [CommonJS modules](https://nodejs.org/api/modules.html).
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: reverted the source code to [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).
- Replaced the [TypeDoc](https://typedoc.org) documentation generator by [JSDoc](https://jsdoc.app).
- Replaced the [TSLint](https://palantir.github.io/tslint) static analyzer by [ESLint](https://eslint.org).
- Updated the package dependencies.

## Version [5.5.0](https://github.com/cedx/enum.js/compare/v5.4.0...v5.5.0)
- Modified the package layout.
- Updated the package dependencies.

## Version [5.4.0](https://github.com/cedx/enum.js/compare/v5.3.0...v5.4.0)
- Added support for [ECMAScript modules](https://nodejs.org/api/esm.html).
- Replaced the [Webpack](https://webpack.js.org) bundler by [Rollup](https://rollupjs.org) and [Babel Minify](https://github.com/babel/minify).
- Updated the package dependencies.

## Version [5.3.0](https://github.com/cedx/enum.js/compare/v5.2.0...v5.3.0)
- Updated the package dependencies.
- Updated the URL of the Git repository.

## Version [5.2.0](https://github.com/cedx/enum.js/compare/v5.1.1...v5.2.0)
- Added support for a redistributable bundle.

## Version [5.1.1](https://github.com/cedx/enum.js/compare/v5.1.0...v5.1.1)
- Fixed the [issue #2](https://github.com/cedx/enum.js/issues/2): relaxed the engine constraint.

## Version [5.1.0](https://github.com/cedx/enum.js/compare/v5.0.0...v5.1.0)
- Updated the package dependencies.

## Version [5.0.0](https://github.com/cedx/enum.js/compare/v4.1.0...v5.0.0)
- Breaking change: ported the source code to [TypeScript](https://www.typescriptlang.org).
- Added an example code.
- Ported the unit tests to classes with experimental decorators.
- Replaced the [ESDoc](https://esdoc.org) documentation generator by [TypeDoc](https://typedoc.org).
- Replaced the [ESLint](https://eslint.org) static analyzer by [TSLint](https://palantir.github.io/tslint).
- Updated the package dependencies.

## Version [4.1.0](https://github.com/cedx/enum.js/compare/v4.0.0...v4.1.0)
- Updated the package dependencies.

## Version [4.0.0](https://github.com/cedx/enum.js/compare/v3.3.0...v4.0.0)
- Breaking change: dropped the `get` prefix from the `getEntries()`, `getNames()` and `getValues()` methods of the enumerated types.

## Version [3.3.0](https://github.com/cedx/enum.js/compare/v3.2.0...v3.3.0)
- Added a user guide based on [MkDocs](http://www.mkdocs.org).
- Updated the build system to [Gulp](https://gulpjs.com) version 4.
- Updated the package dependencies.

## Version [3.2.0](https://github.com/cedx/enum.js/compare/v3.1.0...v3.2.0)
- Added support for browser testing.
- Updated the package dependencies.

## Version [3.1.0](https://github.com/cedx/enum.js/compare/v3.0.0...v3.1.0)
- Changed licensing for the [MIT License](https://opensource.org/licenses/MIT).
- Updated the package dependencies.

## Version [3.0.0](https://github.com/cedx/enum.js/compare/v2.4.0...v3.0.0)
- Added the `assert()` method.
- Added the `coerce()` method.
- Added the `getEntries()` method.
- Added the `getIndex()` method.

## Version [2.4.0](https://github.com/cedx/enum.js/compare/v2.3.0...v2.4.0)
- Removed the dependency on [Babel](https://babeljs.io) compiler.
- Updated the package dependencies.

## Version [2.3.0](https://github.com/cedx/enum.js/compare/v2.2.1...v2.3.0)
- Updated the package dependencies.

## Version [2.2.1](https://github.com/cedx/enum.js/compare/v2.2.0...v2.2.1)
- Fixed a code generation bug.
- Updated the package dependencies.

## Version [2.2.0](https://github.com/cedx/enum.js/compare/v2.1.0...v2.2.0)
- Added support for the [Node Security Platform](https://nodesecurity.io) reports.
- Updated the package dependencies.

## Version [2.1.0](https://github.com/cedx/enum.js/compare/v2.0.1...v2.1.0)
- Updated the package dependencies.

## Version [2.0.1](https://github.com/cedx/enum.js/compare/v2.0.0...v2.0.1)
- Fixed the build system.

## Version [2.0.0](https://github.com/cedx/enum.js/compare/v1.3.0...v2.0.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: using ES2017 features, like async/await functions.
- Improved the build system.
- Ported the unit test assertions from [TDD](https://en.wikipedia.org/wiki/Test-driven_development) to [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development).
- Updated the package dependencies.

## Version [1.3.0](https://github.com/cedx/enum.js/compare/v1.2.0...v1.3.0)
- Updated the package dependencies.

## Version [1.2.0](https://github.com/cedx/enum.js/compare/v1.1.0...v1.2.0)
- Replaced the [Codacy](https://www.codacy.com) code coverage service by the [Coveralls](https://coveralls.io) one.
- Updated the package dependencies.

## Version [1.1.0](https://github.com/cedx/enum.js/compare/v1.0.0...v1.1.0)
- Non-scalar values are excluded from the iteration of enumerable properties.

## Version 1.0.0
- Initial release.
