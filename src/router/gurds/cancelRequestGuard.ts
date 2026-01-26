import type { Router } from 'vue-router';
import { requestPool } from '@/utils/requestPool'
/**
 * 页面跳转取消所有未完成请求
 */
export function setupCancelRequestGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    if (to.name !== from.name) {
      requestPool.clear(to.name as string)
    }
    next()
  })
}