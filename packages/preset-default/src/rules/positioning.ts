import type { Rule } from '@zephracss/core';

import { Units, trailing } from '@zephracss/common';

export const position: Rule = {
    match: new RegExp(`(static|fixed|absolute|relative|sticky)`),
    generate: (_, __, position) => {
        return {
            position,
        };
    },
};

export const inset: Rule = {
    match: new RegExp(`inset-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        const value = Units.from(config, size);

        return {
            top: value,
            right: value,
            bottom: value,
            left: value,
        };
    },
};

export const insetX: Rule = {
    match: new RegExp(`inset-x-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        const value = Units.from(config, size);

        return {
            right: value,
            left: value,
        };
    },
};

export const insetY: Rule = {
    match: new RegExp(`inset-y-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        const value = Units.from(config, size);

        return {
            top: value,
            bottom: value,
        };
    },
};

export const top: Rule = {
    match: new RegExp(`top-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        return {
            top: Units.from(config, size),
        };
    },
};

export const right: Rule = {
    match: new RegExp(`right-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        return {
            right: Units.from(config, size),
        };
    },
};

export const bottom: Rule = {
    match: new RegExp(`bottom-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        return {
            bottom: Units.from(config, size),
        };
    },
};

export const left: Rule = {
    match: new RegExp(`left-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        return {
            left: Units.from(config, size),
        };
    },
};

export const zIndex: Rule = {
    match: new RegExp(`z-(\\d+)`),
    generate: (_, __, size) => {
        return {
            zIndex: size,
        };
    },
};
