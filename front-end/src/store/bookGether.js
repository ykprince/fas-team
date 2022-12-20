import axios from 'axios'

const NO_DATA_MSG = '서재가 텅 비어있어요. 로그인 후, 독서 모임을 추가해주세요! '
export default {
  namespaced: true,
  state: {
    gethers: [], // 등록된 도서 모임 목록
    theGether: { // 등록된 도서 모임 개별 항목
      Type: '',
      staDt: '',
      endDt: '',
      rate: '',
      readPage: '',
      expectRate: '',
      expectComment: '',
      mainColor: ''
    },
    message: NO_DATA_MSG

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
      console.log('resetTheGether:::::::::::::::::::', state)
      state.theGether.Type = payload
      state.theGether.staDt = ''
      state.theGether.endDt = ''
      state.theGether.rate = ''
      state.theGether.readPage = ''
      state.theGether.expectRate = ''
      state.theGether.expectComment = ''
      state.theGether.mainColor = ''
    }
  },
  actions: {
    async testConsole ({ state, commit }) {
      console.log('여기들어와버리기', state)
    },
    async SearchGethers ({ state, commit }, payload) {
      console.log('그룹 조회 시작해버리기')

      try {
        const res = await getBookGetherList(...payload)
        commit('updateState', {
          gethers: res
        })
      } catch (error) {
        console.log(error + '::::::::::')
        commit('updateState', {
          gethers: []
        })
      }
    }
  }
}

// eslint-disable-next-line
async function getBookGetherList (payload) {
  // const { query, sort, page, size, target } = payload
  // console.log(sort, page, size, target)

  const url = '/book/searchGethers'

  return new Promise((resolve, reject) => {
    axios.post(url, payload)
      .then(res => {
        console.log('res')
        console.log(res)
        if (res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => {
        console.log('err')
        console.log(err)
        reject(err.message)
      })
  })
}
