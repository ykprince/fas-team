import axios from 'axios'

const NO_DATA_MSG = '서재가 텅 비어있어요. 로그인 후, 독서 모임을 추가해주세요! '
export default {
  namespaced: true,
  state: {
    gethers: [], // 등록된 도서 모임 목록
    theGether: { // 등록된 도서 모임 개별 항목
      // type: 1,
      // sta_dt: '',
      // end_dt: '',
      // rate: '',
      // read_page: '',
      // rate_ex: '',
      // expectComment: '',
      // mainColor: '',
      // thumbImg: ''
    },
    getherDetail: {},
    message: NO_DATA_MSG,
    gethers2: [
      { title: 'no title book', type: '1', sta_dt: '20221010', end_dt: '20221210', rate: '89', read_page: '', rate_ex: '', expectComment: '', mainColor: '' },
      { title: 'no title book', type: '2', sta_dt: '20221210', end_dt: '', rate: '89', read_page: '200', rate_ex: '', expectComment: '', mainColor: '' },
      { title: 'no title book', type: '3', sta_dt: '20221010', end_dt: '20221210', rate: '89', read_page: '', rate_ex: '88', expectComment: '너무 기대가 되는 조합', mainColor: '' },
      { title: 'no title book', type: '1', sta_dt: '20221010', end_dt: '20221210', rate: '89', read_page: '', rate_ex: '', expectComment: '', mainColor: '' },
      { title: 'no title book', type: '2', sta_dt: '20221010', end_dt: '20221210', rate: '89', read_page: '56', rate_ex: '', expectComment: '', mainColor: '' },
      { title: 'no title book', type: '2', sta_dt: '20221010', end_dt: '20221210', rate: '89', read_page: '56', rate_ex: '', expectComment: '', mainColor: '' }
    ]
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
      state.theGether.sta_dt = ''
      state.theGether.end_dt = ''
      state.theGether.rate = ''
      state.theGether.read_page = ''
      state.theGether.rate_ex = ''
      state.theGether.expectComment = ''
      state.theGether.mainColor = ''
    }
  },
  actions: {
    async insertBookGether ({ state, commit }, payload) {
      const param = { ...state.theGether, ...payload }
      try {
        const res = await getBookGetherList(param)
        console.log(res)
      } catch (error) {
        console.log(error + '::::::::::')
      }
    },
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
  const url = '/book/insert'
  console.log('인서트 스탭 2회차', url, payload)
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
