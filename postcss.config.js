const isProd = process.env.NODE_ENV === 'production'

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(isProd
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
              },
            ],
          },
        }
      : {}),
  },
}
