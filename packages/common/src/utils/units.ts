import { Util } from '../..';
import type { ZephraOptions } from '../../../core/src/types';

const trailing = (source: string) => {
    return source.replace(/^\/|\/$/g, '');
};

const units = /(px|rem|em|vh|vw|vmin|vmax|vb|vi|ch|cm|mm|in|pt|pc|ex|%|zp)?/g;
const number = /(\d+\.?\d*)/g;
const dimension = new RegExp(`${trailing(number.source)}(\%|${trailing(units.source)})?`);

export default {
    match: new RegExp(`(${trailing(dimension.source)}|\[${trailing(dimension.source)}\])`),
    from: (config: ZephraOptions, value: string): string => {
        const match = value.match(dimension);

        if (!match) return '0';

        const [_, size, unit] = match;

        if (!unit) {
            return (config?.presets?.[0]?.theme?.rem || 8) * parseFloat(size) + 'px';
        }

        if (unit === '%') return `${size}${unit}`;

        return `${size}${unit || 'px'}`;
    },
} satisfies Util;
