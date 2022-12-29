import { CLIENT_ID, KAKAO_REST_API_KEY, DEV_REDIRECT_URI, APP_ADMIN_KEY } from '@/store/kakkaoShareLink.js'
import axios from 'axios'
import router from '@/router/index'

export default {
  namespaced: true,
  state: {
    loginstatus: {},
    auths: {}
  },

  mutations: {
    addNewKakaoAuth (state, payload) {
      state.auths = payload
      console.log(state.auths)
    }
  },

  actions: {
    async kakaoAuthorize ({ state, commit }) {
      const result = await window.Kakao.Auth.authorize({
        redirectUri: DEV_REDIRECT_URI
        // scope: 'profile_image, account_email'
      })
      const getTokkenUrl = 'kauth.kakao.com/oauth/token'
      const getTokkenBody = {
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: DEV_REDIRECT_URI,
        code: result,
        client_secret: CLIENT_ID
      }
      const token = await postFetchConnection(getTokkenUrl, getTokkenBody)
      const TokenResult = await window.Kakao.Auth.setAccessToken(token)
      console.log(TokenResult) // token 결과 값 받은 후 작성해야함
    },
    async kakaoLogin ({ state, commit }, payload) {
      const url1 = 'kauth.kakao.com/oauth/token'
      const bodyData = {
        grant_type: 'authorization_code',
        client_id: KAKAO_REST_API_KEY,
        redirect_uri: DEV_REDIRECT_URI,
        code: payload,
        client_secret: CLIENT_ID
      }
      const token = await postFetchConnection(url1, bodyData)
      console.log('kakaoLogin :: data :::   ' + token)

      const url2 = 'kapi.kakao.com/v2/user/me'
      const userData = {
        Authorization: `Bearer ${token.access_token}/KakaoAK ${APP_ADMIN_KEY}`
      }
      const getDataFromKakao = await postHeaderFetchConnection(url2, userData, bodyData)
      console.log('kakaoLogin :: userData :::   ' + getDataFromKakao)
    },
    /**
     * @desc 가입여부 조회 > 미가입시 가입으로 유도
     * @param {object} auth 로그인 정보
     * @param {string} type 로그인 확인 유형
     */
    async checkEmail ({ state, commit }, payload) {
      console.log(payload)
      if (payload.type === 'kakao') {
        const result = await _fetchData('/auth/emailCheck', { email: payload.email })
        if (result === 'exist') {
          console.log('exists!')
        } else {
          commit('addNewKakaoAuth', payload)
          router.push({ path: '/auth/register' })
        }
      }
    },
    async registWithKakao ({ state, commit }) {
      console.log(state.auths)
    }
  }
}

/**
 * @desc axios비동기통신 함수
 * @param {string} url
 * @param {object} payload
 * @returns
 */
function _fetchData (url, payload) {
  return new Promise((resolve, reject) => {
    axios.post(url, null, { params: { ...payload } })
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error)
        }
        console.log(res)
        resolve(res)
      })
      .catch((err) => {
        reject(err.message)
      })
  })
}

/**
 *
 * @param {String} url 주소
 * @param {object} bodyData 보내야하는 데이터
 */
const postFetchConnection = async (url, bodyData) => {
  return new Promise((resolve, reject) => {
    const queryStringBody = Object.keys(bodyData)
      .map(k => encodeURIComponent(k) + '=' + encodeURI(bodyData[k]))
      .join('&')

    fetch('https://' + url, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: queryStringBody
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        resolve(data)
      })
  })
}

/**
 *
 * @param {String} url 주소
 * @param {object} bodyData 보내야하는 데이터
 */
const postHeaderFetchConnection = async (url, headerData, bodyData) => {
  // return new Promise((resolve, reject) => {
  //   fetch('https://' + url, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //       headerData
  //     },
  //     body: ['client_id']
  //   })
  //     .then(res => res.json())
  //     .then((data) => {
  //       console.log(data)
  //       resolve(data)
  //     })
  // })

  return new Promise((resolve, reject) => {
    // const queryStringBody = Object.keys(bodyData)
    //   .map(k => encodeURIComponent(k) + '=' + encodeURI(bodyData[k]))
    //   .join('&')

    fetch('https://' + url, {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        Authorization: headerData.Authorization
      },
      body: ['birthday', 'account_email', 'profile_image', 'openid', 'profile_nickname']
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        resolve(data)
      })
  })
}
