import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* grid */
import MasonryWall from '@yeger/vue-masonry-wall'

/* bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

createApp(App)
  .use(store)
  .use(router)
  .use(MasonryWall)
  .mount('#app')
