import type { Rule } from '@zephracss/core';

import { Units, trailing, Alignments } from '@zephracss/common';

export const flex = {
    match: new RegExp(`flex`),
    generate: () => {
        return {
            display: 'flex',
        };
    },
} satisfies Rule;

export const alignItems = {
    match: new RegExp(`items-(${trailing(Alignments.match.source)})`),
    generate: (config, _, alignment) => {
        return {
            alignItems: Alignments.from(config, alignment),
        };
    },
} satisfies Rule;

export const justifyContent = {
    match: new RegExp(`justify-(${trailing(Alignments.match.source)}|between|around|evenly)`),
    generate: (config, _, alignment) => {
        return {
            justifyContent: Alignments.from(config, alignment),
        };
    },
} satisfies Rule;

export const flexWithDir = {
    match: new RegExp(`flex-(col|row|rev-row|rev-col)`),
    generate: (_, __, direction) => {
        return {
            display: 'flex',
            flexDirection: direction ? direction.replace('rev-', 'reverse ').replace('col', 'column') : 'row',
        };
    },
} satisfies Rule;

export const flexWrap = {
    match: new RegExp(`flex-wrap`),
    generate: () => {
        return {
            flexWrap: 'wrap',
        };
    },
} satisfies Rule;

export const gap = {
    match: new RegExp(`gap-(${trailing(Units.match.source)})`),
    generate: (config, _, size) => {
        return {
            gap: Units.from(config, size),
        };
    },
} satisfies Rule;
