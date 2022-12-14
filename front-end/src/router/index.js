import { createRouter, createWebHistory } from 'vue-router'
// 하단에 router정의
import defaultRouter from './defualt.js' // defualt router 추가하였습니다. (기존의 경로들)
import rollingPaper from './rolling-paper' // 롤링페이퍼 추가하였습니다.

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...defaultRouter, ...rollingPaper] // spread 연산자로 router 정의하면 됩니다.
})

export default router
