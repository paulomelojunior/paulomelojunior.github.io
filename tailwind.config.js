/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./*.html', './src/**/*.ts', './src/assets/js/*.js', './src/language/*.json'],
  theme: {
    fontFamily: {
      sans: [
        '"Mona Sans", sans-serif',
        {
          fontFeatureSettings: '"ss01"',
        },
      ],
      mono: [
        '"Geist Mono", monospace',
        {
          fontFeatureSettings: '"ss01"',
        },
      ],
      inter: [
        '"Inter", sans-serif',
        {
          fontFeatureSettings: '"liga" 1, "calt" 1',
        },
      ],
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#dae6ff',
          200: '#bdd3ff',
          300: '#90b8ff',
          400: '#4d88ff',
          500: '#356afc',
          600: '#1f49f1',
          700: '#1734de',
          800: '#192cb4',
          900: '#1a2a8e',
          950: '#151c56',
        },
      },
    },
  },
  plugins: [],
}
