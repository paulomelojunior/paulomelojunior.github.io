import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    esbuild: {
        loader: 'ts',
        include: /\.ts$/,
    },
    build: {
        outDir: './docs',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                // bitcoin: resolve(__dirname, 'btc.html'),
                404: resolve(__dirname, '404.html'),
            },
        },
    },
    server: {
        host: true
    }
})
