import type { UserConfig } from 'vite'

export function createProdConfig(): UserConfig {
  return {
    build: {
      sourcemap: false,  // 生产环境下是否生成 sourcemap 文件
      chunkSizeWarningLimit: 1500,  // 生产环境下，每个 chunk 文件的大小超过 1500kb 时，会报警告
      rollupOptions: { 
        output: {  
          manualChunks: {  // 生产环境下，手动配置 chunk 分割
            vue: ['vue', 'vue-router', 'pinia'] // 手动将 vue、vue-router、pinia 这三个库打包到一个 chunk 文件中【确保这三个库都安装了】
          }
        }
      }
    }
  }
}
