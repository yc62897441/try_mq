import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({}) => {
    return {
        build: {
            outDir: 'build',
        },
        plugins: [
            react(),
            createHtmlPlugin({
                minify: false,
                pages: [
                    {
                        // entry: 'src/main.jsx', // 使用 JS，沒有使用 TS
                        entry: 'src/main.tsx',
                        filename: 'index.html',
                        template: 'index.html',
                    },
                ],
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    }
})
