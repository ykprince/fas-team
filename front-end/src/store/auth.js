import { CLIENT_ID, KAKAO_REST_API_KEY, DEV_REDIRECT_URI } from '@/store/kakkaoShareLink.js'
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
      await window.Kakao.Auth.setAccessToken(token)
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

      const url2 = 'kapi.kakao.com/v2/user/me'
      const userData = {
        Authorization: `Bearer ${token.access_token}`
      }
      const dataFromKakao = await postHeaderFetchConnection(url2, userData, bodyData)

      if (dataFromKakao.id) {
        const loginCheckData = {
          id: dataFromKakao.id,
          email: dataFromKakao.kakao_account.email,
          nickName: dataFromKakao.kakao_account.profile.nickname,
          profileImg: dataFromKakao.kakao_account.profile.profile_image_url,
          profileThumbnailImg: dataFromKakao.kakao_account.profile.thumbnail_image_url,
          lastLoginAt: new Date().toISOString()
        }
        console.log(loginCheckData)

        const returnData = await _fetchData('/auth/kakaoLoginCheck', loginCheckData)
        console.log(returnData)
      }
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
  return new Promise((resolve, reject) => {
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
