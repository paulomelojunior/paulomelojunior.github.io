/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './assets/js/*.js'],
    theme: {
        fontFamily: {
            sans: [
                '"Funnel", sans-serif',
                {
                    fontFeatureSettings: '"krnl"'
                }
            ],
            inter: [
                '"Inter", sans-serif',
                {
                    fontFeatureSettings: '"case", "ss01", "zero", "tnum"',
                },
            ]
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
            }
        },
    },
    plugins: [],
}