import { Util } from '../..';

const directions = /(t(?:op)?|b(?:ottom)?|l(?:eft)?|r(?:ight)?|x|y)/;

const abbrvMap = {
    t: 'top',
    b: 'bottom',
    l: 'left',
    r: 'right',
    x: 'inline',
    y: 'block',
};

export default {
    match: directions,
    from: (config, direction: string) => {
        if (direction.length === 1) {
            return abbrvMap[direction];
        }

        return direction;
    },
} satisfies Util;
