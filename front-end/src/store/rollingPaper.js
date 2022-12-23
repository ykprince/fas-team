const testData = [
  {
    id: 10001,
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    aboutPage: 'fasol pagessss1',
    paperStyle: 'tomato', // 스타일 설정
    expireDate: '',
    paperList: [
      {
        writer: '김상훈',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: 'seagreen',
        hiddenYn: true
      },
      {
        writer: '이용근',
        content: '올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: false
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.',
        style: 'tomato',
        hiddenYn: true
      }
    ]
  },
  {
    id: 10002,
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    aboutPage: 'fasol pagessss2',
    paperStyle: 'seagreen', // 스타일 설정
    expireDate: '',
    paperList: [
      // 개별 items (다른사람들이 작성)
      {
        writer: '김상훈',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: 'seagreen',
        hiddenYn: true
      },
      {
        writer: '이용근',
        content: '올해도 수고하셨습니다.',
        style: 'darkviolet',
        hiddenYn: false
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: true
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: true
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: true
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: true
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: true
      }
    ]
  },
  {
    id: 10003,
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    aboutPage: 'fasol pagessss3',
    paperStyle: 'darkviolet', // 스타일 설정
    expireDate: '',
    paperList: [
      // 개별 items (다른사람들이 작성)
      {
        writer: '김상훈',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: 'darkviolet',
        hiddenYn: true
      },
      {
        writer: '이용근',
        content: '올해도 수고하셨습니다.',
        style: 'darkslategrey',
        hiddenYn: false
      },
      {
        writer: '홍샘이',
        content: '올해도 수고하셨습니다.',
        style: 'royalblue',
        hiddenYn: true
      }
    ]
  }
]

export default {
  state: {
    namespaced: true,
    all: [], // Array
    one: {}, // Object
    검색용: {}, // Object
    searchResult: false
  },

  mutations: {
    returnState (state, payload) {
      state.searchResult = payload
    },
    updateState (state, papers) {
      state.all = papers
    },
    updateOneState (state, paper) {
      console.log('updateOneState')
      state.one = paper
    },
    searchUpdateState (state, paper) {
      state.one.paperList = paper
    }
  },

  actions: {
    getAllPapers ({ commit }) {
      commit('updateState', testData)
    },
    async deletePaper ({ state, commit }, payload) {
      const newObj = state.all.filter((item) =>
        item !== payload
      )
      commit('updateState', newObj)
    },

    /**
     * @desc 동일한 제목이 있는지 검사
     * @param {String} payload 롤링페이퍼 제목
     */
    searchPaperTitle ({ state, commit }, payload) {
      const resultObj = state.all.filter((item) =>
        item.paperName === payload
      )
      const result = (resultObj.length > 0)
      commit('returnState', result)
    },

    /**
     * @desc 새로운 롤링페이퍼 생성
     * @param {Object} payload 새로 생성할 데이터 정보
     */
    async addNewPaper ({ state, commit }, payload) {
      const newPaperInfo = {
        paperName: payload.title,
        aboutPage: payload.content,
        paperStyle: payload.paperStyle,
        expireDate: payload.date,
        paperList: []
      }
      const newPaperList = state.all.push(newPaperInfo)
      await commit('updateState', newPaperList)
    },
    async updatePapperTitle ({ state, commit }, payload) {
      const newObj = state.all.filter(function (item) {
        if (item.id === payload.id) {
          item.paperName = payload.paperName
        }
        return item
      })
      commit('updateState', newObj)
    },
    async getOnePaper ({ state, commit }, id) {
      const numberId = Number(id)
      const newObj = state.all.filter(item => item.id === numberId)
      commit('updateOneState', newObj[0])
    },
    async addNewLetter ({ state, commit }, dataObj) {
      const newObj = {
        writer: dataObj.name,
        content: dataObj.content,
        releaseAt: dataObj.date,
        style: dataObj.style,
        hiddenYn: dataObj.hiddenYn,
        created_at: dataObj.created_at
      }
      console.log(newObj)
      // dataObj.id 를 가지고 있는 롤링페이퍼.paperList에 newObj 추가하기 (db처리)
      // insert into letterList where id=id
    },
    async searchNameInPaper ({ state, commit }, obj) {
      obj.paperid = Number(obj.paperid)
      console.log('dsasdasdsada' + obj)
      let newObj = []
      if (obj.name === '') {
        newObj = state.all.filter(item => item.id === obj.paperid)[0]
      } else {
        newObj = state.one.paperList.filter(item => item.writer.includes(obj.name))
      }
      commit('searchUpdateState', newObj)
    },
    async restoreOne ({ state, commit }) {
      commit('updateOneState')
    }
  }
}
