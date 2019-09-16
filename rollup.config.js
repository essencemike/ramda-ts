const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');
const { uglify } = require('rollup-plugin-uglify');

const banner = `/*\n
   * Exile.js v' + version + '\n
   * (c) 2018-${new Date().getFullYear()} IMike\n
   * Released under the MIT License.\n
   */`;

const name = require('./package.json').name;

function generateName(str) {
  const fileName = name.split('/')[1];

  if (fileName === 'R') {
    return fileName;
  }

  return `R_${fileName}`;
}
module.exports = {
  input: './index.ts',
  external: [],
  output: {
    file: './lib/index.js',
    format: 'umd',
    banner,
    name: generateName(name),
    sourceMap: true
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    typescript(),
    babel({
      // 只编译源代码
      exclude: 'node_modules/**',
      // 配置runtime
      runtimeHelpers: true
    }),
    uglify()
  ]
};
