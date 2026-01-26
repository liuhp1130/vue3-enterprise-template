import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { setupRouterGuards } from './gurds'

export const route: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: '/login',
        meta: { hidden: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: { hidden: true },
    },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: route,
    scrollBehavior: () => ({ top: 0 }), // 跳转后滚动到顶部
})
setupRouterGuards(router)


export default router