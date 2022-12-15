import { createStore } from 'vuex'
import _uniqBy from 'lodash/uniqBy'

export default createStore({
  state: {
    habits: [],
    loading: false,
    theHabit: ''
  },
  getters: {
  },
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
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
    async searchHabitWithId ({ state, commit }, payload) { // 습관 아이디로 조회
      if (state.loading) return

      commit('updateState', {
        theHabit: {},
        loading: true
      })

      try {
        const res = await _fetchHabit(payload)
        console.log(res)
        commit('updateState', {
          theHabit: res.data
        })
        console.log(res)
      } catch (error) {
        commit('updateState', {
          theHabit: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
})

// '_' 기호는 현재 페이지에서만 사용한다는 의미
function _fetchHabit (payload) {
  // db에서 습관 목록 가져오기
  // const { title, type, year, page, id, habitId } = payload;
  // const url = habitId ? -> 습관 아이디가 있는 경우 습관 아이디로 조회

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
