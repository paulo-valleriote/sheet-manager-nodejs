import { defineConfig, mergeConfig } from 'vite'
import { baseConfig } from './vitest.config.mjs'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'e2e',
      environmentMatchGlobs: [['./src/http/controllers/**', 'prisma']],
      include: ['./src/http/**/*.spec.ts'],
    },
  }),
)
