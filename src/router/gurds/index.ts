// 路由守卫的入口文件

import type { Router } from "vue-router"
import { setupAuthGuard } from "./authGurd"
export function setupRouterGuards(router: Router) {
  setupAuthGuard(router)
}
