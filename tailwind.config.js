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
                    '50':  '#fff1f1',
                    '100': '#ffe1e1',
                    '200': '#ffc7c7',
                    '300': '#ffa0a0',
                    '400': '#ff6464',
                    '500': '#f83b3b',
                    '600': '#e51d1d',
                    '700': '#c11414',
                    '800': '#a01414',
                    '900': '#841818',
                    '950': '#480707',
                },
                'new': {
                    '50': '#e7fff9',
                    '100': '#c6ffee',
                    '200': '#92ffe4',
                    '300': '#4dffdb',
                    '400': '#00ffcc',
                    '500': '#00e8b7',
                    '600': '#00be97',
                    '700': '#00987e',
                    '800': '#007865',
                    '900': '#006254',
                    '950': '#003831',
                }
            }
        },
    },
    plugins: [],
}