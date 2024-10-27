import { defineConfig } from 'vite';
import {resolve} from 'path';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import {ViteEjsPlugin} from 'vite-plugin-ejs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dns from 'node:dns';

if (dns.setDefaultResultOrder === undefined) {
    dns.setDefaultResultOrder = () => {};
}

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), eslint(), ViteEjsPlugin(), viteStaticCopy({
        targets: [{
            src: '.htaccess',
            dest: '../is'
        }]
    })],
    server: {
        host: 'localhost',
    },
    build: {
        outDir: '../is',
        emptyOutDir: true,
        chunkSizeWarningLimit: 3000,
    },
    resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
});
