import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
    // Add this line for custom domain root deployment
    base: "/", 
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    resolve: command === "build"
        ? {
            alias: {
                "react-dom/server": "react-dom/server.node",
            },
        }
        : undefined,
}));