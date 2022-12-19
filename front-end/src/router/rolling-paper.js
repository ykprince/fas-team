export default [
  {
    path: '/rollingpaper',
    name: 'rollingpaper',
    component: () => import('@/views/RollingPaper/RollingPaperList.vue')
  },
  {
    path: '/add-rollingpaper',
    name: 'addRollingpaper',
    component: () => import('@/views/RollingPaper/RollingPaperAddNew.vue')
  },
  {
    path: '/view-rollingpaper',
    name: 'viewRollingpaper',
    component: () => import('@/views/RollingPaper/viewRollingpaper.vue')
  }
]
