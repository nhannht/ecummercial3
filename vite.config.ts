import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: './client',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './client'),
        }
    },
    build:{
        target: ["es2020",'edge88','firefox78','chrome87','safari12']
    }



})
