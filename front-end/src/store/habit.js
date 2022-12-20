import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: {
    habits: [
      {
        habitId: '1',
        title: '테스트1',
        description: '테스트입니다1테스트입니다1',
        icon: 'habitIcon1',
        date: '2022.12.10'
      },
      {
        habitId: '2',
        title: '테스트2',
        description: '테스트입니다2테스트입니다1',
        icon: 'habitIcon2',
        date: '2022.12.10'
      },
      {
        habitId: '3',
        title: '테스트3',
        description: '테스트입니다2테스트입니다1',
        icon: 'habitIcon3',
        date: '2022.12.10'
      },
      {
        habitId: '4',
        title: '테스트4',
        description: '테스트입니다2테스트입니다1',
        icon: 'habitIcon4',
        date: '2022.12.10'
      },
      {
        habitId: '5',
        title: '테스트2',
        description: '테스트입니다2테스트입니다1',
        icon: 'habitIcon2',
        date: '2022.12.10'
      }
    ],
    loading: false,
    habitIcons: ['habitIcon1', 'habitIcon2', 'habitIcon3', 'habitIcon4', 'habitIcon5'],
    theHabit: {},
    thisWeek: []
  },
  getters: {},
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async searchHabits ({ state, commit }, payload) {
      if (state.loading) {
        return
      }

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchHabit({
          ...payload
        })

        const { Search } = res.data
        commit('updateState', {
          habits: _uniqBy(Search, 'habitId') // 중복제거
        })
      } catch (message) {
        commit('updateState', {
          habits: [],
          message: message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchHabitWithId ({ state, commit }, payload) {
      // 습관 아이디로 조회
      // if (state.loading) return

      commit('updateState', {
        theHabit: {}
        // loading: true
      })

      payload = {
        title: '테스트4',
        description: '테스트입니다2테스트입니다1',
        icon: 'habitIcon4',
        ...payload
      }
      console.log('얍', payload)

      try {
        const res = await _fetchHabit(payload)
        console.log('뇨뇨뇨뇨뇨뇨')
        commit('updateState', {
          theHabit: res
        })
      } catch (error) {
        commit('updateState', {
          theHabit: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async addHabit ({ state, commit }, payload) {
      await commit('updateState', {
        habits: [...state.habits, ...payload],
        theHabit: payload[0]
      })

      console.log(this.state.theHabit)
    }
  }
}

// '_' 기호는 현재 페이지에서만 사용한다는 의미
function _fetchHabit (payload) {
  console.log('나온답니까?')
  console.log(payload)
  payload = {
    ...payload
  }
  console.log('얄라리얄라')
  console.log(payload)
  // db에서 습관 목록 가져오기
  // const { title, description, id, habitId } = payload;
  // const url = habitId ? -> 습관 아이디가 있는 경우 습관 아이디로 조회
  return payload
  // return new Promise((resolve, reject) => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       if (res.data.Error) {
  //         reject(res.data.Error);
  //       }
  //       console.log(res);
  //       resolve(res);
  //     })
  //     .catch((err) => {
  //       reject(err.message);
  //     });
  // });
}
