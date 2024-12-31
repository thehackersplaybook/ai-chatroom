import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["setup.ts"],
    env: {
      NODE_ENV: "test",
    },
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
