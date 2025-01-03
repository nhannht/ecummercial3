/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import * as path from "node:path";

export default defineConfig({
    plugins:[react()],
    root: './client',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './client'),
        }
    },
  //@ts-ignore
    test: {
        environment: 'jsdom',
        setupFiles: ['vitest.setup.ts'],
    },
})