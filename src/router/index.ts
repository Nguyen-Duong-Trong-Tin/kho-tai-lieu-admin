import { createRouter, createWebHistory } from 'vue-router'

import store from '@/stores'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import LoginView from '@/views/login/LoginView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    // Reachable without logging in, shown without the header (LayoutAuth)
    public?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/login',
      name: 'login',
      component: LoginView,
      meta: { public: true },
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach(async (to) => {
  await store.dispatch('auth/restoreSessionAction')
  const isLoggedIn = store.state.auth.user !== null

  if (to.meta.public) {
    return isLoggedIn ? { name: 'dashboard' } : true
  }
  return isLoggedIn ? true : { name: 'login', query: { redirect: to.fullPath } }
})

export default router
