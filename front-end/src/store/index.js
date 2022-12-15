import { createStore } from 'vuex'
import about from './about'
import book from './book'
import habit from './habit'
import rollingPaper from './rollingPaper'

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
    habit,
    rollingPaper
  }
})
