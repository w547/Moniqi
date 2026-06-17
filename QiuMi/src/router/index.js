import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/pages/CreatePage.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/pages/GamePage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
