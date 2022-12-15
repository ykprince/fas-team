const testData = [
  {
    paperName: 'Fasol', // 롤링페이퍼 1개 obj
    paperStyle: {}, // 스타일 설정
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
    paperStyle: {}, // 스타일 설정
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
    paperStyle: {}, // 스타일 설정
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
console.log('rolling Paper js', testData)
// const getAllPaper = function (cb) {
//   setTimeout(() => cb(testData), 100)
// }

export default {
  state: {
    namespaced: true, // 해당 옵션으로 인해, 중복되는 호출부를 제한할 수 있음. 대신 dispath시 rollingPaper/blabla 로 호출해야함
    all: []
  },

  mutations: {
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
    }
  }
}
