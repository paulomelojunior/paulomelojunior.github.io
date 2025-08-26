import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  esbuild: {
    loader: 'ts',
    include: /\.ts$/,
    drop: command === 'build' ? ['console', 'debugger'] : undefined,
    legalComments: command === 'build' ? 'none' : 'eof',
    minifyIdentifiers: command === 'build',
    minifySyntax: command === 'build',
    minifyWhitespace: command === 'build',
  },
  build: {
    outDir: 'docs',
    minify: 'esbuild',
    cssMinify: 'esbuild',
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
    rollupOptions: {
      treeshake: 'recommended',
      input: {
        404: '404.html',
        main: 'index.html',
        projects: 'projects.html',
        twyne: 'twyne.html',
      },
      output: {
        hashCharacters: 'hex',
        assetFileNames: 'src/[hash:6].[ext]',
        chunkFileNames: 'src/[hash:6].js',
        entryFileNames: 'src/[hash:6].js',
        manualChunks: {
          vendor: ['gsap', 'lenis', 'lit'],
          i18n: ['i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
  server: {
    port: 2121,
    open: true,
  },
  optimizeDeps: {
    include: ['gsap', 'lenis', 'lit', 'i18next'],
  },
}))
