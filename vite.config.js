import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss({
      content: ['./*.html', './src/**/*.ts', './src/language/*.json'],
    })
  ],
  esbuild: {
    loader: 'ts',
    include: /\.ts$/,
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
})
