/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './*.html',
        './src/**/*.ts',
        './assets/js/*.js'
    ],
    theme: {
        fontFamily: {
            sans: [
                '"Aspekta", sans-serif',
                {
                    fontFeatureSettings: '"ss02", "ss04", "ss07", "ss08", "ss11"'
                }
            ],
        },
        container: {
            center: true
        },
        extend: {
            colors: {
                'brand': {
                    '50': '#e5f0ff',
                    '100': '#cfe4ff',
                    '200': '#a9caff',
                    '300': '#75a5ff',
                    '400': '#3f6dff',
                    '500': '#1437ff',
                    '600': '#001eff',
                    '700': '#001fff',
                    '800': '#001be3',
                    '900': '#000fb3',
                    '950': '#000566',
                },
                'canary': {
                    '50': '#fdffe5',
                    '100': '#f9ffc7',
                    '200': '#f2ff95',
                    '300': '#e6ff64',
                    '400': '#d2f625',
                    '500': '#b3dd05',
                    '600': '#8bb100',
                    '700': '#688605',
                    '800': '#53690b',
                    '900': '#45590e',
                    '950': '#243201',
                },
            }
        },
    },
    plugins: [],
}