import type { Variant } from '@zephracss/core';

export const hover = {
    match: 'hover',
    generate: (_, className, variant) => {
        return {
            append: `:hover`,
            css: variant,
        };
    },
} satisfies Variant;
