export default [
  {
    path: '/rollingpaper',
    name: 'rollingpaper',
    component: () => import('@/views/RollingPaperList.vue')
  },
  {
    path: '/add-rollingpaper',
    name: 'addRollingpaper',
    component: () => import('@/views/RollingPaperAddNew.vue')
  }
]
