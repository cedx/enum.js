const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'lib/index.js',
  output: {file: 'build/enum.js', format: 'iife', name: 'Enum'},
  plugins: [commonjs()]
};
