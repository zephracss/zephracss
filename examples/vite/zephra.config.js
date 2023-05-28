import presetDefault from '@zephracss/preset-default';

/**
 * @type {import("@zephracss/core").ZephraOptions}
 */
export default {
    extend: {
        fonts: {
            mono: ['SF Mono', 'Cascadia Code', 'Source Code Pro'],
        },
        colors: {
            primary: '#121213',
            secondary: '#19191B',
            accent: '#FFBF58',
        },
        rules: [
            {
                match: /highlight/,
                generate: () => {
                    return {
                        backgroundColor: '#FFBF58',
                        color: '#121213',
                    };
                },
            },
        ],
    },
    presets: [presetDefault],
};
