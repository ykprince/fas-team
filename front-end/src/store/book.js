import axios from 'axios'
console.log(':::::::::::::::::::::::::::::::::::::')
const NO_DATA_MSG = '서재가 텅 비어있어요. 로그인 후, 독서 모임을 추가해주세요! '
export default {
  namespaced: true,
  state: {
    meta: [], // 조회 정보 ex) 조회된 갯수 등
    books: [], // 조회된 도서 목록
    theBook: {}, // 조회된 도서 개별 항목
    curStep: 1, // 모임등록 단계
    loading: false,
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
    resetBooks (state) {
      state.meta = []
      state.books = []
      state.message = NO_DATA_MSG
      state.loading = false
      state.curStep = 1
      state.theBook = {}
    }
  },
  actions: {
    async searchBooks ({ state, commit }, payload) {
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        // const res = await _fetchBook({
        const res = await _fetchBook({
          ...payload,
          page: 1
        })
        const { meta, documents } = res.data
        commit('updateState', {
          books: documents,
          meta: meta
        })
      } catch ({ message }) {
        commit('updateState', {
          books: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async sendData ({ state, commit }, payload) {
      commit('updateState', {
        theBook: payload,
        loading: true
      })
    },
    async pageCtrl ({ state, commit }, payload) {
      commit('updateState', {
        curStep: payload
      })
    }
  }
}

// eslint-disable-next-line
async function _fetchBook(payload) {
  const { query, sort, page, size, target } = payload
  console.log(sort, page, size, target)
  //   const { title, type, year, page, id } = payload
  const key = 'fe183eb6099a52483687d16016c6ef65'
  const host = 'dapi.kakao.com'
  const hearderVal = {
    headers: {
      host: host,
      Authorization: 'KakaoAK ' + key
      // ttbkey: 'ttbkruise 11571515001'
    }
  }

  const url = `https://dapi.kakao.com/v3/search/book?query=${query}`
  // const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbKey=${hearderVal.headers.ttbkey}&Query=${query}`
  //   const url = id
  //     ? `https://dapi.kakao.com/v3/search/book?query=${query}`
  //     : ''

  return new Promise((resolve, reject) => {
    axios.get(url, hearderVal)
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
// // eslint-disable-next-line
// async function _fetchBook2(payload) {
//   const { query, sort, page, size, target } = payload
//   console.log(sort, page, size, target)
//   //   const { title, type, year, page, id } = payload
//   // const key = 'fe183eb6099a52483687d16016c6ef65'
//   // const host = 'dapi.kakao.com'
//   const hearderVal = {
//     headers: {
//       // host: host,
//       // Authorization: 'KakaoAK ' + key
//       ttbkey: 'ttbkruise 11571515001'
//     }
//   }

//   // const url = `https://dapi.kakao.com/v3/search/book?query=${query}`
//   const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbKey=${hearderVal.headers.ttbkey}&Query=${query}`
//   //   const url = id
//   //     ? `https://dapi.kakao.com/v3/search/book?query=${query}`
//   //     : ''

//   return new Promise((resolve, reject) => {
//     axios.get(url)
//       .then(res => {
//         console.log('res')
//         console.log(res)
//         if (res.data.Error) {
//           reject(res.data.Error)
//         }
//         resolve(res)
//       })
//       .catch(err => {
//         console.log('err')
//         console.log(err)
//         reject(err.message)
//       })
//   })
// }
