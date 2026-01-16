import { defineConfig, loadEnv, mergeConfig } from 'vite'
import { createBaseConfig } from './build/vite.base'
import { createDevConfig } from './build/vite.dev'
import { createProdConfig } from './build/vite.prod'

export default defineConfig(({ mode , command }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env,'env',command,'command')
  
  const isBuild = command === 'build'
  const baseConfig = createBaseConfig(isBuild)
  
  if (mode === 'dev') {
    return mergeConfig(baseConfig, createDevConfig())
  }

  if (mode === 'prod') {
    console.log(env,'prod')
    return mergeConfig(baseConfig, createProdConfig(isBuild))
  }

  return baseConfig
})
