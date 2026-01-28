import vuePlugin from "@vitejs/plugin-vue"
import type { UserConfig } from "vite"

export function createProdConfig(isBuild: boolean): UserConfig {
  return {
    // 定义全局常量替换方式
    define: isBuild
      ? {
          // 是否包含 Vue 选项式 API，设置为false 时，Vue 构建时会移除选项式 API 相关的代码，这可以显著减小最终打包体积（约减少 30%）
          __VUE_OPTIONS_API__: false, // data、methods、computed、watch 和生命周期钩子都失效，
          __VUE_PROD_DEVTOOLS__: false, // 关闭 Vue 生产环境下的 devtools 功能
        }
      : {},
    build: {
      outDir: "dist-prod", // 打包输出目录
      // 生产环境打包优化：开启压缩，减小体积
      minify: "esbuild", // esbuild 压缩比 terser 更快，体积更小
      // 生产环境打包优化：开启摇树优化，剔除无用代码
      lib: false,
      sourcemap: false, // 生产环境下是否生成 sourcemap 文件
      chunkSizeWarningLimit: 1500, // 生产环境下，每个 chunk 文件的大小超过 1500kb 时，会报警告
      rollupOptions: {
        output: {
          // 分包策略：将第三方依赖（vue/pinia/axios）单独打包，利于浏览器缓存
          manualChunks: {
            // 生产环境下，手动配置 chunk 分割。
            vue: ["vue", "vue-router", "pinia"], // 手动将 vue、vue-router、pinia 这三个库打包到一个 chunk 文件 vue.[hash].js 中【确保这三个库都安装了】
          },
          /**
           * 还可以将这些拆开，分别打包到不同的 chunk 文件中
           * 好处：
           * 1、runtime-core 仍在 vue chunk
           * 2、pinia / router 分别打包到不同的 chunk 文件中，独立缓存
           * 3、首屏更轻
           */
          // manualChunks: {
          //   vue:['vue'],
          //   pinia: ['pinia'],
          //   router: ['vue-router'],
          // }
        },
      },
    },
  }
}
