import { defineConfig } from 'vite'

export default defineConfig({
    esbuild: {
        loader: 'ts',
        include: /\.ts$/,
    },
    build: {
        outDir: 'docs',
        rollupOptions: {
            input: {
                main: 'index.html',
                glyphs: 'glyphs.html',
                twyne: 'twyne.html',
                404: '404.html',
            },
            output: {
                hashCharacters: 'hex',
                assetFileNames: 'src/[hash:6].[ext]',
                chunkFileNames: 'src/[hash:6].js',
                entryFileNames: 'src/[hash:6].js',
            }
        }
    },
    server: {
        port: 2121,
        open: true
    },
})