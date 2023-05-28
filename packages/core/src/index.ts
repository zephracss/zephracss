import { ZephraOptions } from './types';

import build from './build';

export const defineConfig = (config: ZephraOptions) => config;

export { recomputeClassNames } from './build/scan';
export { build };

export default build;
