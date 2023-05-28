import { Directions, trailing } from '@zephracss/common';
import type { Rule } from '@zephracss/core';

export const overflow = {
    match: new RegExp(`o(?:verflow)?-(auto|hidden|visible|scroll)`),
    generate: (_, __, overflow) => {
        return {
            overflow,
        };
    },
} satisfies Rule;

export const overflowDirections = {
    match: new RegExp(`o(?:verflow)?${trailing(Directions.match.source)}-(auto|hidden|visible|scroll)`),
    generate: (_, __, direction, overflow) => {
        return {
            [`overflow-${direction}`]: overflow,
        };
    },
} satisfies Rule;
