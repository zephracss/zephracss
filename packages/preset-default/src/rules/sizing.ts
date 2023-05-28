import type { Rule } from '@zephracss/core';

import { Units, trailing } from '@zephracss/common';

export const width = {
    match: new RegExp(`w(?:idth)?-(auto|full|screen|fit|${trailing(Units.match.source)})`),
    generate: (config, _, size) => {
        if (size === 'auto') return { width: 'auto' };
        if (size === 'full') return { width: '100%' };
        if (size === 'fit') return { width: 'fit-content' };
        if (size === 'screen') return { width: '100vw' };

        return {
            width: Units.from(config, size),
        };
    },
} satisfies Rule;

export const height = {
    match: new RegExp(`h(?:eight)?-(auto|full|screen|fit|${trailing(Units.match.source)})`),
    generate: (config, _, size) => {
        if (size === 'auto') return { height: 'auto' };
        if (size === 'full') return { height: '100%' };
        if (size === 'fit') return { height: 'fit-content' };
        if (size === 'screen') return { height: '100vh' };

        return {
            height: Units.from(config, size),
        };
    },
} satisfies Rule;
