import type { Rule } from '@zephracss/core';

import { Units, Directions, Sizes, trailing } from '@zephracss/common';

export const border = {
    match: new RegExp(`b(?:order)?(?:-(\\w+))?`),
    generate: (config, _, style) => {
        return {
            borderStyle: style || 'solid',
            borderWidth: '1px',
        };
    },
} satisfies Rule;

export const borderSize = {
    match: new RegExp(`b(?:order)?w(?:idth)?-(${trailing(Units.match.source)})`),
    generate: (config, _, size) => {
        return {
            borderWidth: Units.from(config, size),
        };
    },
} satisfies Rule;

export const borderDirections = {
    match: new RegExp(`b(?:order)?${trailing(Directions.match.source)}-(${trailing(Units.match.source)})`),
    generate: (config, _, direction, size) => {
        return {
            [`border-${Directions.from(config, direction)}`]: Units.from(config, size),
        };
    },
} satisfies Rule;

export const borderRadius = {
    match: new RegExp(`rounded(?:-(${trailing(Sizes.match.source)}))?`),
    generate: (config, _, size) => {
        const level = Sizes.from(config, size) as number;

        return {
            borderRadius: `${level * 2}px`,
        };
    },
} satisfies Rule;
