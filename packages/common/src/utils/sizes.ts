import type { Util } from '../..';

const sizes = /(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/;

export default {
    match: sizes,
    from: (config, size: string) => {
        const base = 1;

        switch (size) {
            case 'xs':
                return base * 1;
            case 'sm':
                return base * 2;
            case 'md':
                return base * 3;
            case 'lg':
                return base * 4;
            case 'xl':
                return base * 5;
            case '2xl':
                return base * 6;
            case '3xl':
                return base * 7;
            case '4xl':
                return base * 8;
            case '5xl':
                return base * 9;
            case '6xl':
                return base * 10;
            case '7xl':
                return base * 11;
            case '8xl':
                return base * 12;
            case '9xl':
                return base * 13;
            default:
                return size;
        }
    },
} satisfies Util;
