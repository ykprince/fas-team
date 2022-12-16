const testData = [
  {
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    aboutPage: 'fasol pagessss1',
    paperStyle: {}, // 스타일 설정
    expireDate: '',
    paperList: [
      // 개별 items (다른사람들이 작성)
      {
        writter: '김상훈',
        title: '안녕하세요. fasol에서 작성',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: {},
        hiddenYn: true
      },
      {
        writter: '이용근',
        title: '안녕하세요.',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: false
      },
      {
        writter: '홍샘이',
        title: '안녕하세요. 샘이에요',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: true
      }
    ]
  },
  {
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    aboutPage: 'fasol pagessss2',
    paperStyle: {}, // 스타일 설정
    expireDate: '',
    paperList: [
      // 개별 items (다른사람들이 작성)
      {
        writter: '김상훈',
        title: '안녕하세요. fasol에서 작성',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: {},
        hiddenYn: true
      },
      {
        writter: '이용근',
        title: '안녕하세요.',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: false
      },
      {
        writter: '홍샘이',
        title: '안녕하세요. 샘이에요',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: true
      }
    ]
  },
  {
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    aboutPage: 'fasol pagessss3',
    paperStyle: {}, // 스타일 설정
    expireDate: '',
    paperList: [
      // 개별 items (다른사람들이 작성)
      {
        writter: '김상훈',
        title: '안녕하세요. fasol에서 작성',
        content: '올해도 수고하셨습니다. 내년에도 잘 부탁드려요.',
        style: {},
        hiddenYn: true
      },
      {
        writter: '이용근',
        title: '안녕하세요.',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: false
      },
      {
        writter: '홍샘이',
        title: '안녕하세요. 샘이에요',
        content: '올해도 수고하셨습니다.',
        style: {},
        hiddenYn: true
      }
    ]
  }
]

export default {
  state: {
    namespaced: true, // 해당 옵션으로 인해, 중복되는 호출부를 제한할 수 있음. 대신 dispath시 rollingPaper/blabla 로 호출해야함
    all: [],
    searchResult: false
  },

  mutations: {
    returnState (state, payload) {
      state.searchResult = payload
    },
    updateState (state, papers) {
      state.all = papers
    }
  },

  actions: {
    async selectOnePaper ({ state, commit }, payload) {
      console.log(payload)
    },
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
        paperStyle: {},
        expireDate: payload.date,
        paperList: []
      }
      const newPaperList = state.all.push(newPaperInfo)
      await commit('updateState', newPaperList)
    },
    async updatePapper ({ state, commit }, payload) {
      console.log(payload) // 수정 내용 추가해야함.
    }
  }
}
