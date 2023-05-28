import type { Rule } from '@zephracss/core';

export const bg = {
    match: new RegExp(`bg-\\[(.+?)\\]`),
    generate: (_, __, color) => {
        return {
            backgroundColor: color,
        };
    },
} satisfies Rule;

export const color = {
    match: new RegExp(`color-\\[(.+?)\\]`),
    generate: (_, __, color) => {
        return {
            color: color,
        };
    },
} satisfies Rule;

export const opacity = {
    match: new RegExp(`opacity-(\\d+\\.?\\d*)`),
    generate: (_, __, opacity) => {
        return {
            opacity: opacity,
        };
    },
} satisfies Rule;
