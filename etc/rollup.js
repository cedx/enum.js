import {resolve} from 'path';

export default {
  input: resolve(__dirname, '../lib/index.js'),
  output: {
    extend: true,
    file: resolve(__dirname, '../build/enum.js'),
    format: 'iife',
    name: 'window'
  }
};
