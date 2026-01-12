import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export function createBaseConfig(): UserConfig {
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    }
  }
}
