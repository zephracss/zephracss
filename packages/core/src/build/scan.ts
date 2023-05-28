import { trailing } from '@zephracss/common';
import { ColorGroup, Rule, Variant, ZephraOptions } from '~/types';

const buildClassNames = (config: ZephraOptions) => {
    const presets = config?.presets;
    const extend = config?.extend;

    if (!presets)
        return {
            classNames: new Set<[RegExp, Rule | string]>(),
            variants: new Set<[string, Variant]>(),
        };

    const classNames = new Set<[RegExp, Rule | string]>();
    const variantsRes = new Set<[string, Variant]>();

    if (extend?.fonts) {
        for (const [n, font] of Object.entries(extend?.fonts)) {
            classNames.add([new RegExp(`font-${n}`), `font-family: ${font.join(', ')}`]);
        }
    }

    if (extend?.colors) {
        for (const [n, color] of Object.entries(extend?.colors)) {
            if (typeof color === 'string') {
                classNames.add([new RegExp(`color-${n}`), `color: ${color}`]);
                classNames.add([new RegExp(`bg-${n}`), `background-color: ${color}`]);
                classNames.add([new RegExp(`border-${n}`), `border-color: ${color}`]);

                continue;
            }

            for (const shade of Object.keys(color)) {
                classNames.add([new RegExp(`color-${n}-${shade}`), `color: ${color[shade]}`]);
                classNames.add([new RegExp(`bg-${n}-${shade}`), `background-color: ${color[shade]}`]);
                classNames.add([new RegExp(`border-${n}-${shade}`), `border-color: ${color[shade]}`]);
            }
        }
    }

    if (extend?.rules) {
        for (const rule of Object.values(extend?.rules)) {
            const { match } = rule;

            classNames.add([match, rule]);
        }
    }

    for (const preset of presets) {
        const { rules, colors, variants } = preset;

        if (variants) {
            for (const variant of Object.values(variants)) {
                const { match } = variant;

                variantsRes.add([match, variant]);
            }
        }

        for (const rule of Object.values(rules)) {
            const { match } = rule;

            classNames.add([match, rule]);
        }

        for (const [n, color] of Object.entries(colors)) {
            if (typeof color === 'string') {
                classNames.add([new RegExp(`color-${n}`), `color: ${color}`]);
                classNames.add([new RegExp(`bg-${n}`), `background-color: ${color}`]);
                classNames.add([new RegExp(`border-${n}`), `border-color: ${color}`]);

                continue;
            }

            for (const shade of Object.keys(color)) {
                classNames.add([new RegExp(`color-${n}-${shade}`), `color: ${color[shade]}`]);
                classNames.add([new RegExp(`bg-${n}-${shade}`), `background-color: ${color[shade]}`]);
                classNames.add([new RegExp(`border-${n}-${shade}`), `border-color: ${color[shade]}`]);
            }
        }
    }

    return {
        classNames,
        variants: variantsRes,
    };
};

let classnamesCache: null | Set<[RegExp, Rule | string]> = null;
let variantsCache: null | Set<[string, Variant]> = null;

export const recomputeClassNames = (config: ZephraOptions) => {
    const built = buildClassNames(config);

    classnamesCache = built.classNames;
    variantsCache = built.variants;
};

export default async (config: ZephraOptions, file: string) => {
    if (!classnamesCache || !variantsCache) recomputeClassNames(config);

    const fileClassNames = new Set<[string, undefined | Variant, Rule | string, ...any[]]>();

    for (const [className, rule] of classnamesCache) {
        const globalClassName = new RegExp(`(?:(\\w+):)?${trailing(className.source)}`, 'g');

        const matches = file.match(globalClassName);

        if (matches) {
            for (const match of matches) {
                const groups = match.match(new RegExp(`(?:(\\w+):)?${trailing(className.source)}`));

                const variantName = groups?.[1];

                if (variantName) {
                    const variant = Array.from(variantsCache).find(([name]) => name === variantName);

                    if (variant) {
                        const [_, variantRule] = variant;

                        fileClassNames.add([groups[0], variantRule, rule, ...groups.slice(2)]);

                        continue;
                    }
                }

                if (Array.from(fileClassNames).some(([className]) => className === groups[0])) continue;

                if (groups) fileClassNames.add([groups[0], undefined, rule, ...groups.slice(2)]);
            }
        }
    }

    return fileClassNames;
};
