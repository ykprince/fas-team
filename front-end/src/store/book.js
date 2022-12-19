import axios from 'axios'
console.log('bbbbbbbbbbbbbbbbb')
export default {
  namespaced: true,
  state: {
    meta: [],
    books: [],
    loading: false,
    theBook: {},
    message: 'test'
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
      console.log('reset:::::::::::::::::::')
      state.books = []
      state.message = ''
      state.loading = false
    }
  },
  actions: {
    async searchBooks ({ state, commit }, payload) {
      // const { title, type, number, year } = payload
    //   if (state.loading) return
      console.log(payload)
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchBook({
          ...payload,
          page: 1
        })
        const { meta, documents } = res.data
        commit('updateState', {
          books: documents
        })
        console.log(meta)
        console.log(documents)
        console.log(typeof documents)
        // ceil = 올림!
        // const total = parseInt(meta.total_count, 10)
        // const pageLength = Math.ceil(total / 10) // 총 페이지의 길이
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
  // const url = `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?query=${query}&ttbkey=ttbkruise 11571515001`
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
