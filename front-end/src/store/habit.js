import axios from 'axios'

export default {
  namespaced: true,
  state: {
    habits: [],
    loading: false,
    habitIcons: ['habitIcon1', 'habitIcon2', 'habitIcon3', 'habitIcon4', 'habitIcon5'],
    theHabit: {},
    today: (() => {
      const curDate = new Date()
      const year = curDate.getFullYear()
      const month = curDate.getMonth() + 1
      const date = curDate.getDate()

      return {
        year: year,
        month: month,
        date: date
      }
    })(),
    thisWeek: (() => {
      const days = ['일', '월', '화', '수', '목', '금', '토']
      const curDate = new Date()
      const thisDate = curDate.getDate()
      const thisDay = curDate.getDay()

      const thisWeek = []

      for (let i = 0; i < 7; i++) {
        const resultDay = thisDate - thisDay + i
        const theDate = new Date(curDate.setDate(resultDay)).toISOString().substring(0, 10).replaceAll('-', '')
        const obj = {
          day: days[i],
          date: theDate,
          icon: ''
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
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchHabit({
          ...payload
        })

        // const { Search } = res.data

        commit('updateState', {
          habits: res.data
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
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      payload.startDate = state.thisWeek[0].date
      payload.endDate = state.thisWeek[state.thisWeek.length - 1].date

      try {
        const res = await _fetchHabit(payload)
        const records = res.data.habitRecords
        const thisWeek = state.thisWeek

        for (const day of thisWeek) {
          if (records.length < 1) {
            day.icon = ''
          } else {
            for (const record of records) {
              if (record.date === day.date) {
                day.icon = record.icon
                break
              }
            }
          }
        }

        commit('updateState', {
          theHabit: res.data,
          thisWeek: thisWeek
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
    }
  }
}

// '_' 기호는 현재 페이지에서만 사용한다는 의미
function _fetchHabit (payload) {
  const { habitId } = payload
  const url = habitId ? '/habit/getHabitByHabitId' : '/habit/getHabits'
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
