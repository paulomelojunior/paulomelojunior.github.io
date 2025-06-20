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
                404: '404.html',
            }
        }
    },
    server: {
        port: 2121,
        open: true,
        // host: true
    },
})