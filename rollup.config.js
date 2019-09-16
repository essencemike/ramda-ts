const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');
const { uglify } = require('rollup-plugin-uglify');

const banner = `/*\n
   * Ramda.js v' + version + '\n
   * (c) 2019-${new Date().getFullYear()} IMike\n
   * Released under the MIT License.\n
   */`;

const nameArgs = process.argv[5];
const name = nameArgs ? nameArgs : 'R';

module.exports = {
  input: './index.ts',
  external: [],
  output: {
    file: './lib/index.js',
    format: 'umd',
    banner,
    name,
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
