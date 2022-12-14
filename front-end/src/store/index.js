import { createStore } from 'vuex'
import about from './about'
import book from './book'
import bookGether from './bookGether'
import habit from './habit'
import rollingPaper from './rollingPaper'
import auth from './auth'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    about,
    book,
    bookGether,
    habit,
    rollingPaper,
    auth
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
})
