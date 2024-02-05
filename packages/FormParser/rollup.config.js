import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        requireReturnsDefault: 'auto',
      }),
      typescript({ exclude: ['**/__tests__', '**/*.test.ts'] }),
    ],
  },
  {
    input: './dist/types/index.d.ts',
    output: [{ file: packageJson.types, format: 'esm' }],
    plugins: [dts()],
  },
];