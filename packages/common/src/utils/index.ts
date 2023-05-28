export { default as Directions } from './directions';
export { default as Alignments } from './alignments';
export { default as Units } from './units';
export { default as Sizes } from './sizes';

export const trailing = (source: string) => {
    return source.replace(/^\/|\/$/g, '');
};
