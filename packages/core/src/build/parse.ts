import { CSSLike } from '~/types';

const camelToKebab = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const parseCSSLike = (cssLike: CSSLike): string => {
    if (typeof cssLike === 'string') {
        return cssLike;
    }

    let output = '';

    for (const [property, value] of Object.entries(cssLike)) {
        output += `\n    ${camelToKebab(property)}: ${value};`;
    }

    return output;
};
