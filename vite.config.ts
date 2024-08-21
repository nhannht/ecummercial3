import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";
import browserslistToEsbuild from "browserslist-to-esbuild";
import legacy from '@vitejs/plugin-legacy'
import ResizeObserver from "resize-observer-polyfill"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
    // legacy({
    //     targets: ['safari >= 12, chrome >= 64'],
    //     additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    //     modernPolyfills:true
    // })
    ],
    root: './client',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './client'),
        }
    },
    build:{
        target: browserslistToEsbuild('>0.01%, not dead'),
    },
    esbuild:{
        supported:{
            'const-and-let':true,
            "destructuring":true,
            "array-spread":true,
            "rest-argument":true,
            "object-extensions":true,
            "default-argument":true,
            "class":true,
            "async-await":true,
            "for-of":true


        }
    }



})
