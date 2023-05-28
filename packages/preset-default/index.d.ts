import type { Preset } from '@zephracss/core';

declare const preset: Preset;

declare const variants: Preset['variants'];
declare const colors: Preset['colors'];
declare const rules: Preset['rules'];
declare const theme: Preset['theme'];

export default preset;

export { colors, rules, theme, variants };
