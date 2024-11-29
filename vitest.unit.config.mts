import { defineConfig, mergeConfig } from 'vite'
import { baseConfig } from './vitest.config.mjs'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'unit',
      include: ['./src/use-cases/**/*.spec.ts', './src/utils/**/*.spec.ts'],
    },
  }),
)