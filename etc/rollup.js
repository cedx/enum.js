import {join} from 'path';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: join(__dirname, '../lib/index.js'),
  output: {file: join(__dirname, '../build/enum.js'), format: 'iife', name: 'window', extend: true},
  plugins: [resolve()]
};
