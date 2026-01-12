import { defineConfig, loadEnv, mergeConfig } from 'vite'
import { createBaseConfig } from './build/vite.base'
import { createDevConfig } from './build/vite.dev'
import { createProdConfig } from './build/vite.prod'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const baseConfig = createBaseConfig()

  if (mode === 'development') {
    return mergeConfig(baseConfig, createDevConfig())
  }

  if (mode === 'production') {
    return mergeConfig(baseConfig, createProdConfig())
  }

  return baseConfig
})
