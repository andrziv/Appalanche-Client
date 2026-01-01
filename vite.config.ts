import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/authenticate': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            },
            '/profile': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            },
            '/application': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            },
            '/logo': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
            }
        }
    }
});
