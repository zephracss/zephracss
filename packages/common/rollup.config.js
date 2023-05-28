import { defineConfig } from 'rollup';

import tsconfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            dir: 'dist',
            format: 'esm',
        },
        plugins: [
            commonjs(),
            tsconfigPaths(),
            nodeResolve({
                exportConditions: ['node'],
            }),
            typescript(),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.cjs',
            format: 'cjs',
        },
        plugins: [
            commonjs(),
            tsconfigPaths(),
            nodeResolve({
                exportConditions: ['node'],
            }),
            typescript(),
        ],
    },
]);
