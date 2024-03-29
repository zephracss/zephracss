import { ZephraOptions } from '~/types';

import { info } from '@zephracss/common';

import { parseCSSLike } from './parse';
import scan from './scan';

const esc = (className: string) => {
    return className.replace(/([^\w_-])/g, '\\$1');
};

const classes: Set<string> = new Set();

export default async (config: ZephraOptions, fileContent: string, outputAsArray: boolean) => {
    classes.clear();

    const includedClassNames = await scan(config, fileContent);

    let output = outputAsArray ? [] : '';

    console.log(info(`Detected ${includedClassNames.size} zephra class${includedClassNames.size === 1 ? '' : 'es'}`));

    for (const [className, variant, rule, ...args] of includedClassNames) {
        if (variant) {
            const { generate } = variant;

            if (typeof rule === 'string') {
                const { append: generatedAppend, css } = generate(config, className, rule, ...args);

                if (classes.has(className)) continue;

                if (typeof output === 'object') {
                    output.push({
                        className,
                        append: generatedAppend,
                        variant: variant,
                        css,
                    });

                    continue;
                } else {
                    output += `\n.${esc(className) + generatedAppend} {\n    ${css}\n}\n`;
                }

                classes.add(className);

                continue;
            }

            const original = rule.generate(config, className, ...args);

            const { append: generatedAppend, css } = generate(config, className, original, ...args);

            if (classes.has(className)) continue;

            if (typeof output === 'object') {
                output.push({
                    className,
                    append: generatedAppend,
                    variant: variant,
                    css,
                });

                continue;
            } else {
                output += `\n.${esc(className) + generatedAppend} {\n    ${parseCSSLike(css)}\n}\n`;
            }

            classes.add(className);

            continue;
        }

        if (typeof rule === 'string') {
            if (classes.has(className)) continue;

            if (typeof output === 'object') {
                output.push({
                    className,
                    css: rule,
                });
            } else {
                output += `\n.${className} {\n    ${rule}\n}\n`;
            }

            classes.add(className);

            continue;
        }

        const { generate } = rule;

        if (classes.has(className)) continue;

        if (typeof output === 'object') {
            output.push({
                className,
                variant: rule,
                css: generate(config, className, ...args),
            });

            continue;
        } else {
            output += `\n.${esc(className)} {${parseCSSLike(generate(config, className, ...args))}\n}\n`;
        }

        classes.add(className);

        continue;
    }

    return typeof output === 'object'
        ? output
        : config?.minify
        ? output.replace(/\n/g, '').replace(/\s\s+/g, ' ')
        : output;
};
