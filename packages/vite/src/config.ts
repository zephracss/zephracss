import { ZephraOptions } from '@zephracss/core';

import fs from 'fs';

import jiti from 'jiti';

const require = jiti(process.cwd());

export const loadConfigFromFile = (file: string) => {
    if (fs.existsSync(file)) {
        return require(file);
    }

    throw new Error(`Configuration file ${file} does not exist`);
};

export const loadConfigFromObject = (config: ZephraOptions) => {
    return config;
};
