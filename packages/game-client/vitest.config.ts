import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import tsconfigPaths from "vite-tsconfig-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  plugins: [tsconfigPaths()],
});
