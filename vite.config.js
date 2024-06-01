import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "https://bachat4king.github.io/CopyPasteDolares",
    server: {
        host: false,  // Esto permite que el servidor sea accesible en la red local
    },
})
