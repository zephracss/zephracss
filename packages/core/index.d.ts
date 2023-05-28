export type CSSProperty = keyof CSSStyleDeclaration;

export type CSSLike =
    | string
    | {
          [key in CSSProperty]?: string | number | string[] | number[];
      };

/**
 * A rule is a function that takes a config and a match and returns a CSSLike value.
 */
export type Rule = {
    /**
     * A regular expression to match against the class name.
     * @example
     * match: /bg-(\w+)/
     */
    match: RegExp;
    /**
     * Generate a CSSLike value from the matched string.
     *
     * @param config The current Zephra configuration options.
     * @param match The string that matched the rule's regular expression.
     * @param args Any capture groups from the regular expression.
     * @returns {CSSLike}
     *
     * @example
     * generate: (config, match, color) => {
     *   return {
     *     backgroundColor: color,
     *   }
     * }
     */
    generate: (config: ZephraOptions, match: string, ...args: string[]) => CSSLike;
};

export type Variant = {
    match: string;
    generate: (
        config: ZephraOptions,
        match: string,
        original: CSSLike,
        ...args: string[]
    ) => {
        append?: string;
        css?: CSSLike;
    };
};

export type ColorGroup =
    | string
    | {
          100?: string;
          200?: string;
          300?: string;
          400?: string;
          500?: string;
          600?: string;
          700?: string;
          800?: string;
          900?: string;
          1000?: string;
      };

export interface Preset {
    colors?: {
        [key: string]: ColorGroup;
    };
    rules?: {
        [key: string]: Rule;
    };
    theme?: {
        rem?: number;
        sizes?: {
            [key: string]: string | number;
        };
    };
    variants?: {
        [key: string]: Variant;
    };
}

export interface ZephraOptions {
    /**
     * Whether or not to minify the output.
     */
    minify?: boolean;
    /**
     * A glob pattern to match files against.
     * @example
     * include: 'src/*.{jsx,tsx,html}'
     */
    include?: string;
    /**
     * A path to the file where Zephra should write the output.
     * Relative to the current working directory.
     *
     * @example
     * output: 'dist/style.css'
     */
    output?: string;
    /**
     * Extend your Zephra preset with custom rules, variants, or fonts.
     */
    extend?: {
        /**
         * A map of fonts to be used in your CSS.
         *
         * @example
         * fonts: {
         *  'sans': 'Inter, sans-serif',
         * }
         */
        fonts?: {
            [key: string]: string[];
        };
        /**
         * A map of custom rules to be used in your CSS.
         *
         * @see {Rule}
         * @example
         * rules: {
         *   'bg-gradient': {
         *     match: /bg-gradient-(\d+)/,
         *     generate: (config, match, value) => {
         *       return "..."
         *     }
         *   }
         * }
         */
        rules?: {
            [key: string]: Rule;
        };
        /**
         * A map of colors to be used in your CSS.
         *
         * @example
         * colors: {
         *  'primary': '#FFBF58',
         * }
         *
         * // then use it in your HTML
         * <div class="bg-primary"></div>
         */
        colors?: {
            [key: string]: ColorGroup;
        };
        /**
         * A list of variants to be used in your CSS.
         */
        variants?: Variant[];
    };
    presets?: Preset[];
    plugins?: {}[];
}

export function defineConfig(config: ZephraOptions): ZephraOptions;

export function build<T extends boolean>(
    config: ZephraOptions,
    fileContent: string,
    outputAsArray?: T
): Promise<
    true extends T
        ? {
              css: CSSLike;
              className: string;
              variant?: Variant;
              append?: string;
          }[]
        : string
>;

export function recomputeClassNames(config: ZephraOptions): void;

export default build;
