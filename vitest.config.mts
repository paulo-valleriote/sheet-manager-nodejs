import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export const baseConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
  },
})