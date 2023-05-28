import { Rule } from '@zephracss/core';

import { Units, Directions, trailing } from '@zephracss/common';

export const grid = {
    match: new RegExp(`(?:(inline)-)?grid`),
    generate: (_, inline) => {
        return {
            display: inline ? 'inline-grid' : 'grid',
        };
    },
} satisfies Rule;

export const gridCols = {
    match: new RegExp(`grid-cols-(\\d+)`),
    generate: (_, __, cols) => {
        return {
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        };
    },
} satisfies Rule;

export const gridRows = {
    match: new RegExp(`grid-rows-(\\d+)`),
    generate: (_, __, rows) => {
        return {
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        };
    },
} satisfies Rule;
