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
    path: '/Login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/oauth/callback/kakao',
    name: 'kakaoLoginHandler',
    component: () => import('@/components/ETC/KakaoLoginHandler.vue')
  }
]
