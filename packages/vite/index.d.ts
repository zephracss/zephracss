import type { ZephraOptions } from '@zephracss/core';
import type { Plugin } from 'vite';

declare function pluginZephra(options: ZephraOptions | string): Plugin;

export default pluginZephra;
