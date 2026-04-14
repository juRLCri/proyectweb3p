import { defineConfig } from "vite";
import { resolve } from "node:path";
import { globSync } from "glob";

function obtenerHtmlFiles() {
    return Object.fromEntries(
        globSync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file) => {
            return [
                file.replace(/\.html$/, ""),
                resolve(__dirname, file)
            ];
        })
    );
}

export default defineConfig({
    appType: 'mpa',
    base: process.env.DEPLOY_BASE_URL ?? '/PROYECTOWEB3P/',

    build: {
        cssCodeSplit: false,
        rollupOptions: {
            input: obtenerHtmlFiles(),
        }
    },

    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@styles': resolve(__dirname, 'styles'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@js': resolve(__dirname, 'javascript'),
        }
    },

    plugins: []
});