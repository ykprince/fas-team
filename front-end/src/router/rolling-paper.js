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
    path: '/view-rollingpaper/:id/:bgColor/:rTitle',
    name: 'viewRollingpaper',
    component: () => import('@/views/RollingPaper/viewRollingpaper.vue'),
    props: true
  },
  {
    path: '/new-letter',
    name: 'WriteNewLetter',
    component: () => import('@/views/RollingPaper/WriteNewLetter.vue')
  },
  {
    path: '/bg',
    name: 'bgcomp',
    component: () => import('@/components/rollingPaper/BgComp.vue'),
    props: true
  }
]
