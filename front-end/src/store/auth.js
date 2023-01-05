import { CLIENT_ID, KAKAO_REST_API_KEY, DEV_REDIRECT_URI, KAKAO_JS_API_KEY } from '@/store/kakkaoShareLink.js'
import axios from 'axios'
import router from '@/router/index'

export default {
  namespaced: true,
  state: {
    auth: {},
    logoutChk: false
  },

  getters: {
    getAuth (state) {
      return state.auth
    },
    getLogoutCheck (state) {
      return state.logoutChk
    }
  },

  mutations: {
    updateAuth (state, payload) { // 회원정보 업데이트
      state.auth = payload
    },
    updateLogoutChk (state, payload) {
      state.logoutChk = payload
    }
  },

  actions: {
    async kakaoAuthorize ({ state, commit }) {
      await window.Kakao.init(KAKAO_JS_API_KEY)
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
    /**
     * @desc 카카오로 로그인 or 회원가입 자동 처리
     * @param {String} payload code 값
     */
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
          kakaoId: dataFromKakao.id,
          email: dataFromKakao.kakao_account.email,
          nickName: dataFromKakao.kakao_account.profile.nickname,
          profileImg: dataFromKakao.kakao_account.profile.profile_image_url,
          profileThumbnailImg: dataFromKakao.kakao_account.profile.thumbnail_image_url,
          lastLoginAt: new Date().toISOString()
        }

        const returnData = await _fetchData('/auth/kakaoLoginCheck', loginCheckData) // 카카오로 로그인 및 회원가입 자동 프로세스 처리

        if (returnData.data) {
          commit('updateAuth', returnData.data[0]) // 회원정보 업데이트
        }
      }
    },

    /**
     * @desc 일반 로그인 체크
     * @param {Object} payload id, pw 정보
     */
    async loginCheckById ({ state, commit }, payload) {
      await resetAutoLogin()
      await autoLoginSet(payload) // 자동로그인설정

      if (payload.id === '' || payload.pw === '' || payload.id.length < 4 || payload.pw.length < 4) {
        alert('아이디 및 비밀번호를 확인해주세요.')
        return false
      } else {
        const idAvailableChk = await _fetchData('/auth/idChk', payload)

        if (isEmptyArr(idAvailableChk.data)) { // id가 존재하지않을경우
          return 'no-id'
        } else { // id는 존재하는 경우
          const loginChkRs = await _fetchData('/auth/idPwChk', payload) // id,pw 체크
          if (isEmptyArr(loginChkRs.data)) {
            return 'no-pw'
          } else {
            commit('updateAuth', loginChkRs.data[0]) // auth-store 정보 저장
            setSessionLogin(loginChkRs.data[0])

            return 'success-login'
          }
        }
      }
    },

    /**
     * @desc 일반 회원가입
     * @param {Object} payload id, pw
     */
    async registWithId ({ state, commit }, payload) {
      console.log(payload)
      if (payload.id === '' || payload.pw === '' || payload.id.length < 4 || payload.name === '') {
        return 'verify-failure'
      }
      const idCheckResult = await _fetchData('/auth/chkIdAvailable', { id: payload.id }) // id 존재여부체크
      if (idCheckResult.data === 'available') {
        const rs = await _fetchData('/auth/registNewId', payload)
        return rs.data
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

    /**
     * @desc 아이디/이메일 존재여부 확인
     * @param {String} payload 아이디/이메일
     */
    async chkIdAvailable ({ state, commit }, payload) {
      const rs = await _fetchData('/auth/chkIdAvailable', { id: payload })
      return rs.data
    },

    async getLoginSession ({ state, commit }) { // store에 값이 비었을 때 session에서 값 수신
      if (!state.auth || state.auth === {}) {
        const sessionLoginData = await getSessionLogin()
        if (sessionLoginData && sessionLoginData !== {}) {
          console.log('session에서 불러온 데이터:::: ' + sessionLoginData)
          commit('updateAuth', sessionLoginData)
        }
      }
    },

    async logoutAuth ({ state, commit }) {
      console.log('logout process')
      // 0.session 로그아웃 처리
      sessionStorage.removeItem('fasolSessionLoginInfo')
      // 1.auth 비우기
      commit('updateAuth', {}) // 빈객체로 초기화 처리
      // 2.logoutChk false 처리 : 자동 로그인 방지용
      commit('updateLogoutChk', false)

      router.push('/auth/login')

      // session을 먼저 처리한 이유 : header에 값이 없으면 session으로 얻어오게 하는 created 로직 존재함, 해당 로직이 호출 될 수 있어서
      console.log('logout end')
    }

  }
}

/**
 * @desc axios비동기통신 함수
 * @param {string} url
 * @param {object} payload
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

function isEmptyArr (arr) { // 배열 존재여부체크
  if (Array.isArray(arr) && arr.length === 0) {
    return true
  }

  return false
}

const autoLoginSet = async (loginData) => { // localStorage 저장
  if (loginData.autoLoginChk === true) {
    localStorage.setItem('fasolLocalAutoLoginInfo', JSON.stringify(loginData))
  } else {
    localStorage.removeItem('fasolLocalAutoLoginInfo')
  }
}

const resetAutoLogin = async () => { // 자동 로그인 해제
  localStorage.removeItem('fasolLocalAutoLoginInfo')
}

const setSessionLogin = (loginData) => { // 세션에 로그인 데이터 저장
  sessionStorage.setItem('fasolSessionLoginInfo', JSON.stringify(loginData))
}

const getSessionLogin = async () => { // 세션 로그인정보 가져오기
  const rs = sessionStorage.getItem('fasolSessionLoginInfo')
  sessionStorage.setItem('fasolSessionLoginInfo', rs)
  return JSON.parse(rs)
}
