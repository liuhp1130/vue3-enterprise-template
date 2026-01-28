import type { UserConfig } from "vite"

export function createDevConfig(): UserConfig {
  return {
    build: {
      outDir: "dist-dev", // 打包输出目录
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        "/api": {
          target: "https://api-ordtrd-dev.webterren.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
}
