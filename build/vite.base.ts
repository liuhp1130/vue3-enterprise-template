import type { UserConfig } from 'vite'
import path from 'path'
import { createVitePlugins } from './vite.plugins'

export function createBaseConfig(isBuild: boolean): UserConfig {
  return {
    plugins: createVitePlugins(isBuild),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    }
  }
}


