import { defineConfig } from 'vite'

export default defineConfig({
    esbuild: {
        loader: 'ts',
        include: /\.ts$/,
    },
    build: {
        outDir: 'docs'
    }
})
