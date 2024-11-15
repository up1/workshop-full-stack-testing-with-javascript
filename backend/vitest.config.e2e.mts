
import { defineConfig } from 'vitest/config'
const isCI = process.env.CI === "true";

export default defineConfig({
  test: {
    include: ['tests/e2e/*.spec.ts'],
    coverage: {
        provider: 'istanbul', // or 'v8'
        reporter: isCI ? ["lcov", "text-summary"] : ["text","text-summary"],
        exclude: ["**/node_modules/**"],
        include: ["**/src/**"],
        clean: true
      },
  },

})