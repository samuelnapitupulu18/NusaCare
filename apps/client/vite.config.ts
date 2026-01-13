import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3002, // Container internal port
        strictPort: true,
        host: true, // Needed for Docker
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Localhost for dev
                changeOrigin: true,
                ws: true
            }
        }
    }
})
