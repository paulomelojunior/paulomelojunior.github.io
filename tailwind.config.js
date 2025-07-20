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
                    '400': '#4dcb8c',
                }
            }
        },
    },
    plugins: [],
}