import HomeView from '@/views/HomeView.vue'
import LoginView from '@/components/auth/Index.vue'

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
    component: () => import('@/components/auth/KakaoLoginHandler.vue')
  },
  {
    path: '/auth/regist',
    name: 'register',
    component: () => import('@/components/auth/Register.vue')
  },
  {
    path: '/auth/mypage',
    name: 'mypage',
    component: () => import('@/views/Auth/MyPage.vue')
  },

  { // 경로가 없을 경우 (404)
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/Error.vue')
  }
]
