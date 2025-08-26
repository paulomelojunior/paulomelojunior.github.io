import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  esbuild: {
    loader: 'ts',
    include: /\.ts$/,
    drop: command === 'build' ? ['console', 'debugger'] : undefined,
    legalComments: command === 'build' ? 'none' : 'eof',
  },
  build: {
    outDir: 'docs',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
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
      },
    },
  },
  server: {
    port: 2121,
    open: true,
  },
}))
