import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"
import { setupRouterGuards } from "./gurds"

export const route: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    redirect: "/login",
    meta: { hidden: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/loginPage.vue"),
    meta: { hidden: true },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/homePage.vue"),
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
