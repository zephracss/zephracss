import { ZephraOptions } from '@zephracss/core';

import fs from 'fs';
import path from 'path';

import jiti from 'jiti';

const require = jiti(process.cwd());

export let RESOLVED_PATH: string;

export const refetch = () => {
    let p = path.join(process.cwd(), 'zephra.config.ts');

    if (fs.existsSync(p)) {
        RESOLVED_PATH = p;

        return require(p);
    }

    p = path.join(process.cwd(), 'zephra.config.js');

    if (fs.existsSync(p)) {
        RESOLVED_PATH = p;

        return require(p);
    }

    return {};
};

let config = refetch();

export default config?.default as ZephraOptions;
