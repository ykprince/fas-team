import HomeView from '@/views/HomeView.vue'
import LoginView from '@/components/Login/Index.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/auth/callback',
    name: 'kakaoLoginHandler',
    component: () => import('@/components/Login/KakaoLoginHandler.vue')
  },
  {
    path: '/auth/regist',
    name: 'register',
    component: () => import('@/components/Login/Register.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/Error.vue')
  }
]
