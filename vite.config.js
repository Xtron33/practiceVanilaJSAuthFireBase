import liveReload from 'vite-plugin-live-reload'

export default {
    // ...
    plugins: [
        liveReload(['./*.html', './pages/**/*.html'], { alwaysReload: true })
    ]
}