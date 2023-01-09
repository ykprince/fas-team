import axios from 'axios'
const NO_DATA_MSG = '서재가 텅 비어있어요. 로그인 후, 독서 모임을 추가해주세요! '
const FAIL_MSG = '등록에 실패했어요 다시 확인해주세용'
const ROOT_PATH = '/book/'
export default {
  namespaced: true,
  state: {
    gethers: [], // 등록된 도서 모임 목록
    gethersOrigin: [],
    theGether: { // 등록된 도서 모임 개별 항목
    },
    getherContent: { // 상세 컨텐츠
    },
    getherDetail: {},
    message: NO_DATA_MSG,
    successMsg: FAIL_MSG,
    successTf: false,
    memo: {
    },
    memoList: []
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
    resetGethers (state, payload) {
      state.Gethers = payload
    },
    setContent (state, payload) {
      state.getherContent = payload
    }
  },
  actions: {
    async frontController ({ state, commit }, payload) {
      commit('updateState', {
        successMsg: FAIL_MSG,
        successTf: false
      })

      const url = ROOT_PATH + payload.processType + payload.processName
      const param = await valControll(payload.processType, payload.processName, payload, state)

      try {
        const res = await callPostService(url, param)
        // resControll(payload.processType, payload.processName, res, state, commit)

        return resControll(payload.processType, payload.processName, res, state, commit)
        // return { sucTf: true, msg: res.data }
      } catch (error) {
        console.log(error + '::::::::::')
      }
    },
    async filterGethers ({ state, commit }, payload) {
      let tempGethers
      // console.log('thisis', payload)
      payload === 0
        ? tempGethers = state.gethersOrigin
        : tempGethers = state.gethersOrigin.filter((obj) =>
          obj.type === payload
        )
      commit('updateState', {
        gethers: tempGethers
      })
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

/**
 * valControll 인풋값 컨트롤
 * resControll 결과 콜백
 * errControll 에러 콜백
 */
async function valControll (type, name, payload, state) {
  if (type === 'insert') {
    const param = name === 'Gether'
      ? { ...state.theGether, ...payload }
      : { ...payload }
    if (name === 'Gether') {
      param.authors = param.authors.join()
      param.translators = param.translators.join()
    }
    return param
  } else if (type === 'delete') {
    const param = payload.arr
    return param
  } else if (type === 'select') {
    const param = payload
    return param
  }
}

async function resControll (type, name, res, state, commit) {
  if (type === 'insert') {
    if (name === 'Gether') {
      await commit('updateState', {
        successMsg: res.data,
        successTf: true
      })
    } else if (name === 'Memo') {
      console.log('')
    }
  } else if (type === 'select') {
    if (name === 'Gether') {
      await commit('updateState', {
        gethers: res.data,
        gethersOrigin: res.data
      })
      return state.gethers
    } else if (name === 'Memo') {
      const tempObj = state.getherContent
      tempObj.memoList = res.data
      await commit('updateState', {
        getherContent: tempObj
      })
      return tempObj.memoList
    }
  } else if (type === 'delete') {
    console.log('')
  }
}
