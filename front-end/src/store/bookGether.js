import axios from 'axios'
const NO_DATA_MSG = '서재가 텅 비어있어요. 로그인 후, 독서 모임을 추가해주세요! '
const FAIL_MSG = '등록에 실패했어요 다시 확인해주세용'
export default {
  namespaced: true,
  state: {
    gethers: [], // 등록된 도서 모임 목록
    theGether: { // 등록된 도서 모임 개별 항목
    },
    getherContent: { // 상세 컨텐츠
    },
    getherDetail: {},
    message: NO_DATA_MSG,
    successMsg: FAIL_MSG,
    successTf: false
  },
  getters: {
  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetTheGether (state, payload) {
      state.theGether.type = payload
    },
    setContent (state, payload) {
      state.getherContent = payload
    }
  },
  actions: {
    async insertBookGether ({ state, commit }, payload) {
      commit('updateState', {
        successMsg: FAIL_MSG,
        successTf: false
      })
      const url = '/book/insert'
      const param = { ...state.theGether, ...payload }
      param.authors = param.authors.join()
      param.translators = param.translators.join()
      try {
        const res = await callPostService(url, param)
        commit('updateState', {
          successMsg: res.data,
          successTf: true
        })
        return { sucTf: true, msg: res.data }
      } catch (error) {
        console.log(error + '::::::::::')
      }
    },
    async searchGetherList ({ state, commit }, payload) {
      const url = '/book/selectBookGetherList'
      try {
        const res = await callPostService(url, payload)
        commit('updateState', {
          gethers: res.data
        })
      } catch (error) {
        commit('updateState', {
          gethers: []
        })
      }
    }
  }
}

// eslint-disable-next-line
async function callPostService (url, payload) {

  return new Promise((resolve, reject) => {
    axios.post(url, payload)
      .then(res => {
        console.log(res.data)
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err.message)
      })
  })
}

// async function callGetService (url, payload) {
//   return new Promise((resolve, reject) => {
//     axios.get(url, payload)
//       .then(res => {
//         console.log(res)
//         if (res.data.Error) {
//           reject(res.data.Error)
//         }
//         resolve(res)
//       })
//       .catch(err => {
//         console.log(err)
//         reject(err.message)
//       })
//   })
// }
