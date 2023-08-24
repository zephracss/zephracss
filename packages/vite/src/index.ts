import build, { ZephraOptions } from '@zephracss/core';
import { info, separator } from '@zephracss/common';
import fastGlob from 'fast-glob';
import { Plugin } from 'vite';

import path from 'path';
import fs from 'fs';

import { loadConfigFromFile, loadConfigFromObject } from './config';

const hash = () => Math.random().toString(36).substring(2, 9);

export default (options: ZephraOptions | string): Plugin => {
    let config: ZephraOptions;

    switch (typeof options) {
        case 'object':
            config = loadConfigFromObject(options);

            break;
        case 'string':
            config = loadConfigFromFile(path.resolve(process.cwd(), options));

            break;
    }

    let env: 'build' | 'serve';

    return {
        name: 'zephra',
        enforce: 'pre',
        config(_, _env) {
            env = _env.command === 'build' ? 'build' : 'serve';
        },
        resolveId(id, importer) {
            if (id.includes('@zephracss/dist.css?glob') || id.includes('@zephracss/dist.css?direct&glob')) {
                console.log(info('Building as glob'));

                // we have to do this fuckery to make vite recognise this as a css file at build time
                // for *some* reason, it won't load the url params version in dev...
                if (env === 'serve') {
                    return `@zephracss/dist.css#${hash()}:glob`;
                } else {
                    return `@zephracss/dist.css?${hash()}&${importer}`;
                }
            }

            if (id.includes('@zephracss/dist.css')) {
                console.log(info('Building as direct'));

                if (env === 'serve') {
                    return `@zephracss/dist.css#${hash()}:${importer}`;
                } else {
                    return `@zephracss/dist.css?${hash()}&${importer}`;
                }
            }
        },
        async load(id) {
            if (id.includes('@zephracss/dist.css')) {
                let hash, importer;

                if (env === 'serve') {
                    const [_, full] = id.split('#');

                    [hash, importer] = full.split(':');
                } else {
                    const [_, full] = id.split('?');
                    [hash, importer] = full.split('&');
                }

                if (importer === 'glob') {
                    console.log(separator);

                    const include = config?.include || '**/*.{tsx,jsx,html}';

                    const files = fastGlob.sync(include);

                    const output: string[] = [];

                    for (const file of files) {
                        console.log(info(`Building ${file} as glob`));

                        const content = fs.readFileSync(file, 'utf-8');

                        const res = await build(config, content, false);

                        if (res) output.push(res);
                    }

                    console.log(info(`Built ${files.length} file${files.length === 1 ? '' : 's'} as glob`));

                    return output.join(config?.minify ? '' : '\n\n/* @zephra-new-file */\n\n');
                }

                const file = path.resolve(process.cwd(), importer);

                const content = fs.readFileSync(file, 'utf-8');

                console.log(info(`Building ${path.basename(file)} (${hash})`));

                return await build(config, content, false);
            }
        },
    };
};
