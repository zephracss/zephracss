import type { Rule } from '@zephracss/core';

import { Units, Directions, trailing } from '@zephracss/common';

export const margin = {
    match: new RegExp(`m(?:argin)?-(${trailing(Units.match.source)})`),
    generate: (config, _, size) => {
        return {
            margin: Units.from(config, size),
        };
    },
} satisfies Rule;

export const marginDirections = {
    match: new RegExp(`m(?:argin)?${trailing(Directions.match.source)}-(${trailing(Units.match.source)})`),
    generate: (config, _, direction, size) => {
        return {
            [`margin-${Directions.from(config, direction)}`]: Units.from(config, size),
        };
    },
} satisfies Rule;

export const padding = {
    match: new RegExp(`p(?:adding)?-(${trailing(Units.match.source)})`),
    generate: (config, _, size) => {
        return {
            padding: Units.from(config, size),
        };
    },
} satisfies Rule;

export const paddingDirections = {
    match: new RegExp(`p(?:adding)?${trailing(Directions.match.source)}-(${trailing(Units.match.source)})`),
    generate: (config, _, direction, size) => {
        return {
            [`padding-${Directions.from(config, direction)}`]: Units.from(config, size),
        };
    },
} satisfies Rule;
