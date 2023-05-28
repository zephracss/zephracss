import type { ZephraOptions } from '../core/src/types';

export interface Util {
    match: RegExp;
    from: (config: ZephraOptions, size: string) => number | string;
}

export const Units: Util;
export const Sizes: Util;
export const Directions: Util;
export const Alignments: Util;

export const info: (message: string) => string;
export const warn: (message: string) => string;
export const error: (message: string) => string;
export const logo: string;
export const separator: string;

export const trailing: (source: string) => string;
