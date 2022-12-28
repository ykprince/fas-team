import axios from 'axios'
// import { DEV_REDIRECT_URI } from '@/store/kakkaoShareLink.js'

export default {
  namespaced: true,
  state: {
    loginstatus: {}
  },

  actions: {
    async kakaoLogin ({ state, commit }, payload) {
      // axiosConnection(payload)
      axios.post(
        'https://kauth.kakao.com/oauth/token', { params: { code: payload } }, { params: { code: payload } }
      )
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}

// const axiosConnection = (payload) => {

// }
