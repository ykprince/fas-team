import axios from 'axios'

export default {
  namespaced: true,
  state: {
    habits: [],
    loading: false,
    openAddHabitPop: false,
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
    async searchHabits ({ state, commit }) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchHabit('/habit/getHabits')

        commit('updateState', {
          habits: res.data,
          theHabit: {}
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
        const res = await _fetchHabit('/habit/getHabitByHabitId', payload)
        const records = res.data.habitRecords
        const thisWeek = state.thisWeek

        // TODO 깊은 복사를 해도 왜 변수에 새로 담은 값과 스토어의 thisWeek의 값이 동기화 되는건지 이유를 찾지 못함 --> 추후 개선 필요
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
    async addHabit ({ state, commit, dispatch }, payload) {
      commit('updateState', {
        message: '',
        loading: true
      })

      const res = await _fetchHabit('/habit/addHabit', payload)

      await commit('updateState', {
        habits: [...state.habits, res.data],
        openAddHabitPop: false
      })

      // 추가한 습관 내용 재조회
      // TODO 뭔가 비효율적인 느낌.... 추후 개선
      dispatch('searchHabitWithId', {
        habitId: res.data.habitId
      })
    },
    async updateHabit ({ state, commit, dispatch }) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      const obj = state.theHabit
      delete obj.habitRecords // -> 필요 없음

      const res = await _fetchHabitPost('/habit/updateHabit', obj)

      // 업데이트 성공 후 제대로 값이 내려왔을 때
      if (Object.keys(res).length !== 0) {
        // 수정한 습관 재조회
        await dispatch('searchHabitWithId', {
          habitId: obj.habitId,
          theHabit: res.data
        })

        // 습관 목록에 변경한 습관 담기
        for (let i = 0; i < state.habits.length; i++) {
          if (state.habits[i].habitId === obj.habitId) {
            state.habits[i] = res.data
            return
          }
        }
      }
    },
    async deleteHabit ({ state, commit, dispatch }) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      const obj = {
        habitId: state.theHabit.habitId
      }

      await _fetchHabitPost('/habit/deleteHabit', obj)
      await dispatch('searchHabits')
    }
  }
}

// '_' 기호는 현재 페이지에서만 사용한다는 의미
function _fetchHabit (url, payload) {
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

function _fetchHabitPost (url, payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, null, {
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
