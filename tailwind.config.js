/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './assets/js/*.js'],
    theme: {
        fontFamily: {
            sans: ['"Space Grotesk", sans-serif'],
        },
        extend: {
            colors: {
                brand: {
                    400: 'hsl(235 100% 35%)',
                },
            },
        },
    },
    plugins: [],
}
