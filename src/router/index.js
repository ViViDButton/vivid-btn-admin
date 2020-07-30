import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/voice',
    name: 'Voice',
    component: () => import('@/views/voice.vue')
  },
  {
    path: '/vtuber',
    name: 'Vtuber',
    component: () => import('@/views/vtuberManage.vue')
  },
  {
    path: '/group',
    name: 'VoiceGroupManager',
    component: () => import('@/views/group_manager.vue')
  },
  {
    path: '/user',
    name: 'UserManager',
    component: () => import('@/views/user_manager.vue')
  },
  {
    path: '/user/group',
    name: 'UserGroupManager',
    component: () => import('../views/user_manager/group_manager')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
