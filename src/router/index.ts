import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
        name: 'Home',
        component: () => import('../components/HelloWorld.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../components/TheWelcome.vue')
    }
  ]
})

export default router
