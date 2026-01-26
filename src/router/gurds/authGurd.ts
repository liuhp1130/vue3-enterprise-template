import type { Router } from 'vue-router';
import { ROUTE_WHITE_LIST } from '../constants';

/**
 * 登录权限守卫：未登录且不在白名单 → 跳登录页
 */
export function setupAuthGuard(router: Router) {
  router.beforeEach((to) => {
    // const userStore = useUserStore();
    const userStore = { token: '', role: '' };
    const isLogin = !!userStore.token;

    // 白名单路由 → 直接放行
    if (ROUTE_WHITE_LIST.includes(to.path)) {
      return true;
    }

    // 需登录但未登录 → 跳登录页
    if (to.meta.requiresAuth && !isLogin) {
      return {
        path: '/login',
        query: { redirect: to.fullPath }, // 登录后重定向
      };
    }

    // 管理员路由校验
    if (to.meta.role === 'admin' && userStore.role !== 'admin') {
      return '/403';
    }

    return true;
  });
}