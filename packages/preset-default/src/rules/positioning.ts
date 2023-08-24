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
