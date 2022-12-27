import axios from 'axios'

// const testData = [
//   {
//     id: 10001,
//     paperName: 'Fasol', // 롤링페이퍼 1개 obj
//     aboutPage: 'fasol pagessss1',
//     paperStyle: 'tomato', // 스타일 설정
//     expireDate: '',
//     paperList: [
//       {
//         writer: '김상훈',
//         content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
//         style: 'seagreen',
//         hiddenYn: true
//       },
//       {
//         writer: '이용근',
//         content: '올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: false
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.',
//         style: 'tomato',
//         hiddenYn: true
//       }
//     ]
//   },
//   {
//     id: 10002,
//     paperName: 'Fasol', // 롤링페이퍼 1개 obj
//     aboutPage: 'fasol pagessss2',
//     paperStyle: 'seagreen', // 스타일 설정
//     expireDate: '',
//     paperList: [
//       // 개별 items (다른사람들이 작성)
//       {
//         writer: '김상훈',
//         content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
//         style: 'seagreen',
//         hiddenYn: true
//       },
//       {
//         writer: '이용근',
//         content: '올해도 수고하셨습니다.',
//         style: 'darkviolet',
//         hiddenYn: false
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: true
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: true
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: true
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: true
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: true
//       }
//     ]
//   },
//   {
//     id: 10003,
//     paperName: 'Fasol', // 롤링페이퍼 1개 obj
//     aboutPage: 'fasol pagessss3',
//     paperStyle: 'darkviolet', // 스타일 설정
//     expireDate: '',
//     paperList: [
//       // 개별 items (다른사람들이 작성)
//       {
//         writer: '김상훈',
//         content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
//         style: 'darkviolet',
//         hiddenYn: true
//       },
//       {
//         writer: '이용근',
//         content: '올해도 수고하셨습니다.',
//         style: 'darkslategrey',
//         hiddenYn: false
//       },
//       {
//         writer: '홍샘이',
//         content: '올해도 수고하셨습니다.',
//         style: 'royalblue',
//         hiddenYn: true
//       }
//     ]
//   }
// ]

export default {
  state: {
    namespaced: true,
    all: [], // Array
    one: {}, // Object
    letters: [],
    newLetterWritten: false,
    searchResult: false
  },

  mutations: {
    returnState (state, payload) {
      state.searchResult = payload
    },
    updateState (state, papers) {
      state.all = papers
    },
    updateLetters (state, letters) {
      state.letters = letters
    },
    updateOneState (state, paper) {
      state.one = paper
    },
    searchUpdateState (state, paper) {
      state.one.paperList = paper
    }
  },

  actions: {
    /**
     * @desc 본인의 모든 목록 조회
     * @param N/A
     */
    async getAllPapers ({ commit }) {
      const url = '/rp/getRollingpapers'
      const rsObj = await _fetchRollingpaper(url, {})
      console.log(rsObj.data)
      commit('updateState', rsObj.data)
    },
    /**
     * @desc 페이퍼 삭제
     * @param {object} payload 페이퍼 객체 한개
     */
    async deletePaper ({ state, commit }, payload) {
      // post -> rseq 값만 가져감
      const rSeq = payload.rseq
      const url = '/rp/deletePaper'
      const res = await _fetchRollingpaper(url, { rSeq: rSeq })

      if (res.data === 200) {
        const newObj = state.all.filter((item) =>
          item !== payload
        )
        commit('updateState', newObj) // state 상태 변경(새로 받아오지않음)
      } else if (res.data === 101) {
        alert('통신상태 불량으로 삭제 실패')
      } else if (res.data === 100) {
        alert('알수없는 이유로 삭제에 실패')
      }
    },
    /**
     * @desc 현재 가지고 있는 전체 리스트 중 제목만 검색(중복금지)
     * @param {String} payload title value
     */
    async searchPaperTitle ({ state, commit }, payload) {
      const cpList = [...state.all]
      let searchResult = false
      const checkList = cpList.filter(item => item.rtitle === payload)
      if (checkList.length > 0) {
        searchResult = true
      }
      commit('returnState', searchResult)
    },
    /**
    * @desc rTitle 중복 검사
    * @desc rTitle update
    * @param {String} payload 롤링페이퍼 제목
    */
    async checkAndUpdateTitle ({ state, commit }, payload) {
      const url = '/rp/searchUpdateTitle'
      const param = { ...payload }
      const res = await _fetchRollingpaper(url, param)

      if (res.data === 201) { // 성공
        commit('returnState', false)
        const newObj = state.all.filter(function (item) {
          if (item.rseq === payload.rSeq) {
            item.rtitle = payload.rTitle
          }
          return item
        })
        commit('updateState', newObj)
      } else if (res.data === 100) {
        commit('returnState', true)
      } else if (res.data === 101) {
        alert('통신상에 문제가 발생하였습니다. 다시 시도해주세요.')
      } else {
        alert('알 수 없는 오류로 실패하였습니다. 다시 시도해주세요.')
      }
    },
    /**
    * @desc 새로운 롤링페이퍼 생성
    * @param {Object} payload 새로 생성할 데이터 정보
    */
    async addNewPaper ({ state, commit }, payload) {
      const now = new Date().toISOString().substring(0, 10)
      const newPaperInfo = {
        rTitle: payload.rTitle,
        rContent: payload.rContent,
        rStyle: payload.rStyle,
        rExpiredAt: payload.rExpiredAt,
        rCreatedAt: now,
        rUpdatedAt: now
      }
      const url = '/rp/addNewPaper'
      const res = await _fetchRollingpaper(url, newPaperInfo)
      if (res > 0) {
        const newPaperList = state.all.push(newPaperInfo)
        commit('updateState', newPaperList)
      } else {
        alert('실패')
      }
    },
    async getLetters ({ state, commit }, id) {
      // paper filters - front
      const onePage = state.all.filter(item => item.rseq === id)
      console.log('onePage' + onePage)

      // letters 목록 조회 - db
      const url = '/rp/getLetters'
      id = Number(id)
      const param = { rSeq: id }

      const resObj = await _fetchRollingpaper(url, param)
      commit('updateLetters', resObj.data)
    },
    async checkPaperAvailable ({ state, commit }, id) {
      const url = '/searchOnePaper'
      const param = { id: id }
      const res = await _fetchRollingpaper(url, param)
      console.log(res)
    },
    async addNewLetter ({ state, commit }, dataObj) {
      const url = '/rp/addNewLetter'
      const newObj = {
        rSeq: dataObj.id,
        lWriter: dataObj.name,
        lContent: dataObj.content,
        lStyle: dataObj.style,
        lHiddenYn: dataObj.hiddenYn,
        lReleaseAt: dataObj.date,
        lCreatedAt: new Date().toISOString().substring(0, 10)
      }
      const res = await _fetchRollingpaper(url, newObj)
      // if (res.data == 1) {

      // }
      console.log(res)
    },
    async searchNameInPaper ({ state, commit }, obj) {
      obj.paperid = Number(obj.paperid)
      let newObj = []
      if (obj.name === '') {
        newObj = state.all.filter(item => item.id === obj.paperid)[0]
      } else {
        newObj = state.one.paperList.filter(item => item.writer.includes(obj.name))
      }
      commit('searchUpdateState', newObj)
    }
  }
}

/**
 * @desc axios비동기통신 함수
 * @param {string} url
 * @param {object} payload
 * @returns
 */
function _fetchRollingpaper (url, payload) {
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
