import type { Preset } from '@zephracss/core';

import * as variants from './variants';
import * as colors from './colors';
import * as theme from './theme';
import * as rules from './rules';

const preset: Preset = { colors, rules, theme, variants };

export default preset;

export { colors, rules, theme, variants };
