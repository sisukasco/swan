import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';

import packageJson from './package.json' assert { type: 'json' };

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs(),
      json(),
      typescript({ exclude: ['**/__tests__', '**/*.test.ts'] }),
    ],
  },
  {
    input: './dist/types/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
  },
];