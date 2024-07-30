/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './assets/js/*.js'],
    theme: {
        fontFamily: {
            sans: [
                '"Space Grotesk", sans-serif',
                {
                    fontFeatureSettings: '"ss03", "ss04", "case", "zero"',
                },
            ],
            aspekta: [
                '"Aspekta", sans-serif',
                {
                    fontFeatureSettings: '"ss04"',
                },
            ]
        },
        extend: {
            colors: {
                brand: {
                    400: 'hsl(235 100% 35%)',
                    200: 'hsl(235 100% 60%)',
                },
            },
        },
    },
    plugins: [],
}
