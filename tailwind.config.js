/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./assets/js/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ['"Jakarta", sans-serif'],
      serif: [
        '"Jakarta", serif',
        {
          fontFeatureSettings: '"ss01"',
        },
      ],
    },
    extend: {
      spacing: {
        'default': '5vw'
      },
      colors: {
        brand: {
          400: '#000FB3'
        }
      }
    },
  },
  plugins: [],
}

