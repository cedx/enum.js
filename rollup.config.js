const resolve = require('rollup-plugin-node-resolve');
module.exports = {
  input: 'lib/index.mjs',
  output: {file: 'build/enum.js', format: 'iife', name: 'window', extend: true},
  plugins: [resolve()]
};
