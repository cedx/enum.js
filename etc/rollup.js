import resolve from 'rollup-plugin-node-resolve';

export default {
  input: '../lib/index.mjs',
  output: {file: '../build/enum.js', format: 'iife', name: 'window', extend: true},
  plugins: [resolve()]
};
