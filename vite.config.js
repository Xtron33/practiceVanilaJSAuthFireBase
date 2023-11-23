import { defineConfig } from 'vite'
import { resolve } from 'path'
import liveReload from 'vite-plugin-live-reload'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                maincon: resolve(__dirname, 'pages', 'main', 'main.html'),
                login: resolve(__dirname, 'pages', 'login', 'login.html'),
                register: resolve(__dirname, 'pages', 'register', 'register.html'),
            },
        },
    },
    plugins: [
        liveReload(['./*.html', './pages/**/*.html'], { alwaysReload: true })
    ]
})