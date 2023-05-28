import { Util } from '../..';

const alignments = /(center|start|end|inline-start|inline-end|flex-start|flex-end)/;

const abbrvMap = {
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
};

export default {
    match: alignments,
    from: (config, alignments: string) => {
        if (Object.keys(abbrvMap).includes(alignments)) {
            return abbrvMap[alignments];
        }

        return alignments;
    },
} satisfies Util;
