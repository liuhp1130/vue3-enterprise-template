import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'

export function createVitePlugins(isBuild: boolean): PluginOption[] {
  const plugins: PluginOption[] = [vue()]

  if (isBuild) {
    // 只在 build 阶段分析，dev 阶段不污染体验
    plugins.push(
      visualizer({  // 可视化分析插件
        filename: 'stats.html',  // 分析图生成的文件名
        open: true,  // 分析图生成后是否自动打开
        gzipSize: true,  // 分析图是否显示 gzip 压缩大小
        brotliSize: true  // 分析图是否显示 brotli 压缩大小
      })
    )
  }

  return plugins
}
