import { defineConfig } from 'vite'

export default defineConfig({
    esbuild: {
        loader: 'ts',
        include: /\.ts$/,
    },
    build: {
        outDir: 'docs'
        ,
        rollupOptions: {
            input: {
                main: 'index.html',
                404: '404.html'
            }
        }
    }
})
