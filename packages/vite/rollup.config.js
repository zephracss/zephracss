import { defineConfig } from 'rollup';

import tsconfigPaths from 'rollup-plugin-tsconfig-paths';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

import pkg from './package.json';

export default defineConfig({
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'esm',
    },
    plugins: [
        replace({
            preventAssignment: true,
            values: {
                'process.env.VERSION': JSON.stringify(pkg.version),
            },
        }),
        commonjs(),
        tsconfigPaths(),
        nodeResolve({
            exportConditions: ['node'],
        }),
        typescript({
            exclude: ['node_modules/**', 'test/**'],
        }),
        terser(),
    ],
    external: ['@zephracss/core', 'vite'],
});
