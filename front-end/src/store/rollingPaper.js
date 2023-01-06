import axios from 'axios'
import router from '@/router/index.js'

export default {
  state: {
    namespaced: true,
    all: [], // Array
    one: {}, // Object
    letters: [],
    lettersOwnerUid: 0,
    cpLetters: [], // 검색용
    onePageAvailable: true, // 해당 롤링페이퍼 존재여부 확인용
    searchResult: false
  },

  getters: {
    getOnePapersInfo (state) {
      const obj = {
        rtitle: state.one.rtitle,
        rexpiredAt: state.one.rexpiredAt,
        rstyle: state.one.rstyle
      }
      return obj
    }
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
      state.cpLetters = letters
    },
    updateOneState (state, paper) {
      state.one = paper
    },
    searchUpdateState (state, searchLetters) {
      state.letters = searchLetters
    },
    updateOPA (state, bools) {
      state.onePageAvailable = bools
    },
    updateLetterOwnerUid (state, payload) { // rollingpaper owners uid : 비밀글에 사용
      state.lettersOwnerUid = payload
    }
  },

  actions: {
    async getAllPapers ({ state, commit }, payload) { // 소유하고 있는 모든 롤링페이퍼 조회
      const url = '/rp/getRollingpapers'
      const rsObj = await _fetchRollingpaper(url, { uid: payload })
      console.log(rsObj.data)
      commit('updateState', rsObj.data)
    },
    /**
     * @desc 페이퍼 삭제
     * @param {object} payload 페이퍼 객체 한개
     */
    async deletePaper ({ state, commit }, payload) {
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
      const cpList = [...state.letters]
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
        uid: payload.uid,
        rTitle: payload.rTitle,
        rContent: payload.rContent,
        rStyle: payload.rStyle,
        rExpiredAt: payload.rExpiredAt,
        rCreatedAt: now,
        rUpdatedAt: now
      }
      const url = '/rp/addNewPaper'
      const res = await _fetchRollingpaper(url, newPaperInfo)
      if (res.data > 0) {
        const newPaperList = state.all.push(newPaperInfo)
        commit('updateState', newPaperList)
        router.push({ name: 'rollingpaper' })
      } else {
        alert('실패')
      }
    },
    /**
     * @desc 목록 조회 - letter
     * @param {Number} id 롤링페이퍼시퀀스번호
     */
    async getLetters ({ state, commit }, id) {
      const url = '/rp/getLetters'
      id = Number(id)
      const param = { rSeq: id }
      const resObj = await _fetchRollingpaper(url, param) // db조회

      const letters = resObj.data.slo // letters
      const lwriterUid = resObj.data.lwriterUid // uid
      console.log(lwriterUid)
      commit('updateLetters', letters)
      commit('updateLetterOwnerUid', lwriterUid) // rollingpaper owners uid : 비밀글에 사용
    },
    /**
     * @desc 롤링페이퍼가 존재하는지 체크
     * @param {int} id
     */
    async checkPaperAvailable ({ state, commit }, id) {
      const url = '/rp/searchOnePaper'
      const param = { id: id }
      const res = await _fetchRollingpaper(url, param)

      if (res.data.length === 0) {
        alert('해당 페이지는 존재하지않습니다.')
        router.push({ name: 'rollingpaper' })
      } else {
        commit('updateOneState', res.data[0])
      }
    },
    /**
     * @desc 새로운 쪽지 입력
     * @param {Object} dataObj
     */
    async addNewLetter ({ state, commit }, dataObj) {
      const url = '/rp/addNewLetter'
      const newObj = {
        rSeq: dataObj.id,
        lWriter: dataObj.name,
        lwriterUid: dataObj.writerUid,
        lContent: dataObj.content,
        lStyle: dataObj.style,
        lHiddenYn: dataObj.hiddenYn,
        lReleaseAt: dataObj.date,
        lCreatedAt: new Date().toISOString().substring(0, 10)
      }
      const res = await _fetchRollingpaper(url, newObj)

      if (res.data === 1) {
        return true
      } else {
        alert('입력중 오류가 발생하였습니다. 다시 시도해주세요.')
        return false
      }
    },
    /**
     * @desc 검색 기능
     * @param {Objcet} obj 검색내용
     */
    async searchNameInPaper ({ state, commit }, obj) {
      obj.paperid = Number(obj.paperid)
      const newObj = state.cpLetters.filter(item => item.lwriter.includes(obj.name))
      commit('searchUpdateState', newObj)
    },

    async searchMyLetterInPaper ({ state, commit }, uid) { // 내가 쓴 letter 확인
      const newObj = state.cpLetters.filter(item => item.lwriterUid === uid)
      commit('searchUpdateState', newObj)
    },

    /**
     * @desc 리스트 복구 - letter
     */
    async searchNameInPaperRestore ({ state, commit }) {
      commit('searchUpdateState', state.cpLetters)
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
