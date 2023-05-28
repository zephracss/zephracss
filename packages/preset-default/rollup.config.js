import { defineConfig } from 'rollup';

import tsconfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default defineConfig({
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
        terser(),
    ],
    external: ['@zephracss/core'],
});
