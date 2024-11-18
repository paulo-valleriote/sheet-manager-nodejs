import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    dir: 'src',
    environmentMatchGlobs: [['src/http/controllers/**', 'node']]
  },
  plugins: [tsconfigPaths()],
})
