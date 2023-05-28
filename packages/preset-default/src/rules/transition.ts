import { Rule } from '@zephracss/core';

export const transition = {
    match: new RegExp(`transition(?:-(\\d+\\.?\\d*))?`),
    generate: (_, __, duration) => {
        return {
            transitionProperty: 'all',
            transitionTimingFunction: 'ease',
            transitionDuration: duration ? `${duration}ms` : '500ms',
        };
    },
} satisfies Rule;

export const transitionEase = {
    match: new RegExp(`ease(?:-(in|out|in-out|linear))?`),
    generate: (_, __, ease) => {
        if (ease === 'linear') {
            return {
                transitionTimingFunction: 'linear',
            };
        }

        return {
            transitionTimingFunction: ease ? `ease-${ease}` : 'ease',
        };
    },
} satisfies Rule;
