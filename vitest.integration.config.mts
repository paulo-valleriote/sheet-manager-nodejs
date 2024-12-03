import { defineConfig, mergeConfig } from 'vite'
import { baseConfig } from './vitest.config.mjs'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'integration',
      include: ['**/*.integration.spec.ts'],
    },
  }),
)