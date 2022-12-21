import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: {
    habits: [],
    loading: false,
    habitIcons: ['habitIcon1', 'habitIcon2', 'habitIcon3', 'habitIcon4', 'habitIcon5'],
    theHabit: {},
    thisWeek: (() => {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      const curDay = new Date()
      const thisDate = curDay.getDate()
      const thisDay = curDay.getDay()

      const thisWeek = []

      for (let i = 0; i < 7; i++) {
        const resultDay = thisDate - thisDay + i
        const theDate = new Date(curDay.setDate(resultDay)).toISOString().substring(0, 10).replaceAll('-', '')
        const obj = {
          day: days[i],
          date: theDate
        }

        thisWeek.push(obj)
      }

      return thisWeek
    })()
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
      // if (state.loading) {
      //   return
      // }

      // commit('updateState', {
      //   message: '',
      //   loading: true
      // })

      try {
        const res = await _fetchHabit({
          ...payload
        })
        console.log('요기요')
        console.log(res.data)
        const { Search } = res.data
        console.log(_uniqBy(Search, 'habitId'))
        commit('updateState', {
          habits: res.data // 중복제거
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

      payload.startDate = state.thisWeek[0].date
      payload.endDate = state.thisWeek[state.thisWeek.length - 1].date

      try {
        const res = await _fetchHabit(payload)
        console.log('여기는 습관 아이디로 조회 후')
        console.log(res.data)
        commit('updateState', {
          theHabit: res.data
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
  const { habitId } = payload
  console.log(habitId)
  const url = habitId ? '/habit/getHabitByHabitId' : '/habit/getHabits'
  console.log(url)
  // const params = payload

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: payload
      })
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
