import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import reactSSG from "vite-ssg-react"

// Node18 doesn't have `import.meta.dirname`.
const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
    root: join(__dirname, "src"),
    build: {
        emptyOutDir: true,
        assetsDir: "asset",
        // minify: true, // May be useful when shipping vanilla JS along with HTML & CSS?
        cssMinify: true,
        ssrEmitAssets: true,
    },
    plugins: [react(), reactSSG()],
})
