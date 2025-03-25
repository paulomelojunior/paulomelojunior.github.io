/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.html', './assets/js/*.js'],
    theme: {
        fontFamily: {
            sans: [
                '"General", sans-serif',
                {
                    fontFeatureSettings: '"krnl"'
                }
            ],
            general: [
                '"General", sans-serif',
                {
                    fontFeatureSettings: '"krnl"'
                }
            ]
        },
        container: {
            center: true
        },
    },
    plugins: [],
}