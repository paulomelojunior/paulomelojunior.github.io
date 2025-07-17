/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: [
        './*.html',
        './src/**/*.ts',
        './src/assets/js/*.js'
    ],
    theme: {
        fontFamily: {
            sans: [
                '"Aspekta", sans-serif',
                {
                    fontFeatureSettings: '"ss02", "ss04", "ss07", "ss08", "ss11"'
                }
            ],
            mono: [
                '"Geist Mono", monospace',
                {
                    fontFeatureSettings: '"ss01"'
                }
            ],
            inter: [
                '"Inter", sans-serif',
                {
                    fontFeatureSettings: '"liga" 1, "calt" 1'
                }
            ]
        },
        container: {
            center: true
        },
        extend: {
            colors: {
                'brand': {
                    '50': '#fbfde9',
                    '100': '#f5fcc5',
                    '200': '#f2fb8d',
                    '300': '#f1f84c',
                    '400': '#f4f425',
                    '500': '#e4db0e',
                    '600': '#c4ad0a',
                    '700': '#9d7e0b',
                    '800': '#826411',
                    '900': '#6e5115',
                    '950': '#402b08',
                }
            }
        },
    },
    plugins: [],
}