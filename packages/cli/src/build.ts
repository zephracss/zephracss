import perf_hooks from 'perf_hooks';
import fs from 'fs/promises';
import path from 'path';

import glob from 'fast-glob';
import chalk from 'chalk';

import { ZephraOptions, build } from '@zephracss/core';
import { info } from '@zephracss/common';

const makeOutput = async (config: ZephraOptions, output: string) => {
    const file = config?.output || '_zephra.css';

    await fs.writeFile(path.join(process.cwd(), file), output);

    console.log(chalk.greenBright(`Wrote output to ${file}`));
};

export default async (config: ZephraOptions) => {
    const start = perf_hooks.performance.now();

    const files = await glob(config?.include || '**/*.{tsx,jsx,html}');

    const output: string[] = [];

    for (const file of files) {
        console.log(info(`Building ${file}`));

        const content = await fs.readFile(file, 'utf-8');
        const res = await build(config, content, false);

        if (res) output.push(res);

        console.log();
        console.log(chalk.greenBright(`Built ${file}`));
    }

    await makeOutput(config, output.join(config?.minify ? '' : '\n\n/* @zephra-new-file */\n\n'));

    console.log();
    console.log(
        chalk.greenBright(
            `Built ${files.length} file${files.length === 1 ? '' : 's'} in ${perf_hooks.performance.now() - start}ms`
        )
    );
};
