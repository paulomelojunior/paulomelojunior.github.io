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
            ]
        },
        container: {
            center: true
        },
        extend: {
            colors: {
                'brand': {
                    '50':  '#fff1f1',
                    '100': '#ffe1e1',
                    '200': '#ffc7c7',
                    '300': '#ffa0a0',
                    '400': '#FF6464',
                    '500': '#f83b3b',
                    '600': '#e51d1d',
                    '700': '#c11414',
                    '800': '#a01414',
                    '900': '#841818',
                    '950': '#480707',
                }
            }
        },
    },
    plugins: [],
}