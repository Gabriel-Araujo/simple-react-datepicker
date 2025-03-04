import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({ include: ["src"] }),
        libInjectCss()
    ],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.tsx"),
            formats: ["es"]
        },
        rollupOptions: {
            external: ["react", "react/jsx-runtime"],
        },
    },
});
//# sourceMappingURL=vite.config.js.map