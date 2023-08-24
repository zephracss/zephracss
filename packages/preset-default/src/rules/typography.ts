import type { Rule } from '@zephracss/core';

import { Units, trailing } from '@zephracss/common';

export const whitespace = {
    match: new RegExp(`whitespace-(normal|nowrap|pre|pre-line|pre-wrap)`),
    generate: (_, __, whiteSpace) => {
        return {
            whiteSpace,
        };
    },
} satisfies Rule;

export const wordBreak = {
    match: new RegExp(`break-(normal|words|all)`),
    generate: (_, __, wordBreak) => {
        return {
            wordBreak,
        };
    },
} satisfies Rule;

export const textTransform = {
    match: new RegExp(`(uppercase|lowercase|capitalize|normal)`),
    generate: (_, __, textTransform) => {
        return {
            textTransform,
        };
    },
} satisfies Rule;

export const textAlign = {
    match: new RegExp(`(?:text-)?(left|center|right|justify)`),
    generate: (_, __, textAlign) => {
        return {
            textAlign,
        };
    },
} satisfies Rule;

export const textDecoration = {
    match: new RegExp(
        `(underline|line-through|no-underline|underline-dotted|underline-double|underline-dashed|underline-solid|underline-wavy)`
    ),
    generate: (_, __, decoration) => {
        if (decoration === 'no-underline')
            return {
                textDecoration: 'none',
            };

        return {
            textDecoration: decoration,
        };
    },
} satisfies Rule;

export const fontSize = {
    match: new RegExp(`text-${trailing(Units.match.source)}`),
    generate: (config, _, size) => {
        return {
            fontSize: Units.from(config, size),
        };
    },
} satisfies Rule;

export const fontWeight = {
    match: new RegExp(`font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|\\d+)`),
    generate: (_, __, weight) => {
        return {
            fontWeight: weight,
        };
    },
} satisfies Rule;

export const fontStyle = {
    match: new RegExp(`(italic|oblique)`),
    generate: (_, __, style) => {
        return {
            fontStyle: style,
        };
    },
} satisfies Rule;
