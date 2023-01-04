import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* grid */
import MasonryWall from '@yeger/vue-masonry-wall'

/* bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

/* v-calendar */
import VCalendar from 'v-calendar'

createApp(App)
  .use(store)
  .use(router)
  .use(MasonryWall)
  .use(VCalendar, {
    componentPrefix: 'v'
  })
  .mount('#app')
