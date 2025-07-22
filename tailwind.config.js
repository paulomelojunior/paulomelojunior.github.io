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
                '"Mona Sans", sans-serif',
                {
                    fontFeatureSettings: '"ss01"'
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
                    '400': '#4d88ff',
                }
            }
        },
    },
    plugins: [],
}