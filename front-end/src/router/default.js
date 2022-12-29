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
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/auth/callback',
    name: 'kakaoLoginHandler',
    component: () => import('@/components/ETC/KakaoLoginHandler.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('@/components/ETC/Register.vue')
  }
]
