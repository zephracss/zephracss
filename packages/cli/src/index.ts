#!/usr/bin/env node

import { info, separator, logo } from '@zephracss/common';

import { watch } from 'chokidar';

import chalk from 'chalk';
import build from './build';

import config, { RESOLVED_PATH, refetch } from './config';
import { recomputeClassNames } from '@zephracss/core';

console.log(logo);

console.log(chalk.yellowBright(`Zephra @${process.env.VERSION}`));

const watchDev = process.argv.includes('--watch') || process.argv.includes('-w');

console.log(chalk.yellowBright(`Running in ${watchDev ? 'watch' : 'build'} mode`));

build(config);

if (watchDev) {
    watch(config?.include || '**/*.{tsx,jsx,html}').on('change', (file) => {
        console.log(separator);
        console.log(info(`File ${file} changed, rebuilding...`));

        build(config);
    });

    watch(RESOLVED_PATH).on('change', (file) => {
        console.log(separator);
        console.log(chalk.redBright(`Configuration file changed, recomputing...`));

        const config = refetch();

        recomputeClassNames(config?.default);

        console.log(chalk.greenBright(`Building from new cache...`));

        build(config?.default);
    });
}
