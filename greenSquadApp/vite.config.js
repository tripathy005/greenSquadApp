import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        basicSsl(),
        VitePWA({
            registerType: "autoUpdate",

            devOptions: {
                enabled: true
            },

            manifest: {
                name: "GreenSquad",
                short_name: "GreenSquad",
                start_url: "/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#4CAF50",

                icons: [
                    {
                        src: "/icon-192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable"
                    },
                    {
                        src: "/icon-512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable"
                    }
                ]
            }
        })
    ],

    server: {
        host: true,
        port: 7000,
        open: true,

        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})