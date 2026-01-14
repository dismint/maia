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
    },
    {
      path: '/register-player',
      name: 'RegisterPlayer',
      component: () => import('../components/RegisterPlayer.vue')
    },
    {
      path: '/view-player-stats',
      name: 'ViewPlayerStats',
      component: () => import('../components/ViewPlayerStats.vue')
    },
    {
      path: '/start-log-game-session',
      name: 'StartLogGameSession',
      component: () => import('../components/StartLogGameSession.vue')
    }
  ]
})

export default router
