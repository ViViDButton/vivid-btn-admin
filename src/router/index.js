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
    path: '/button/voice',
    name: 'Voice',
    component: () => import('../views/button_manager/voice_manager')
  },
  {
    path: '/vtuber',
    name: 'Vtuber',
    component: () => import('../views/vtuber_manager')
  },
  {
    path: '/button/group',
    name: 'VoiceGroupManager',
    component: () => import('../views/button_manager/group_manager')
  },
  {
    path: '/user',
    name: 'UserManager',
    component: () => import('../views/user_manager/user_manager')
  },
  {
    path: '/user/group',
    name: 'UserGroupManager',
    component: () => import('../views/user_manager/group_manager')
  },
  {
    path: '/button/batch-upload',
    name: 'BatchUpload',
    component: () => import('../views/button_manager/upload_manager')
  },
  {
    path: '/translate',
    name: 'Translate',
    component: () => import('../views/translate_manager/translate_manager')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
