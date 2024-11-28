
import { defineConfig } from 'vitest/config'
const isCI = process.env.CI === "true";

export default defineConfig({
  test: {
    include: ['tests/unit/*.spec.ts'],
    coverage: {
        provider: 'istanbul', // or 'v8'
        reporter: isCI ? ["lcov", "text-summary"] : ["text","text-summary", "html"],
        exclude: ["**/node_modules/**", "**/__mocks__/**"],
        include: ["**/src/**"],
        clean: true
      },
  },

})