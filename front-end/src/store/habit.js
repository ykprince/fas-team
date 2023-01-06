import axios from 'axios'
import _ from 'lodash'

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
    })(),
    theRecord: [],
    attributes: [],
    calendarOn: false
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
          theRecord: state.thisWeek,
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
        const theRecord = _.cloneDeep(state.thisWeek)

        for (const day of theRecord) {
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
        console.log(res.data)
        commit('updateState', {
          theHabit: res.data,
          theRecord: theRecord
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
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      let habitId = ''

      try {
        const res = await _fetchHabit('/habit/addHabit', payload)
        habitId = res.data.habitId

        await commit('updateState', {
          habits: [...state.habits, res.data],
          openAddHabitPop: false,
          calendarOn: false,
          attributes: []
        })
      } catch (error) {
        commit('updateState', { loading: false })
        return
      } finally {
        commit('updateState', { loading: false })
      }

      await dispatch('searchHabitWithId', {
        habitId: habitId
      })
    },
    async updateHabit ({ state, commit, dispatch }, payload) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      let doSch = false

      try {
        const res = await _fetchHabitPost('/habit/updateHabit', payload)

        // 업데이트 성공 후 제대로 값이 내려왔을 때
        if (Object.keys(res.data).length !== 0) {
          doSch = true

          // 습관 목록에 변경한 습관 담기
          const habits = _.cloneDeep(state.habits)
          for (let i = 0; i < state.habits.length; i++) {
            if (habits[i].habitId === payload.habitId) {
              habits[i] = res.data
              break
            }
          }

          commit('updateState', { habits: habits })
        }
      } catch (error) {
        console.log(error)
        console.log('실패')
        commit('updateState', { loading: false })
        return
      } finally {
        commit('updateState', { loading: false })
      }

      if (doSch) {
        // 수정한 습관 재조회
        await dispatch('searchHabitWithId', { habitId: payload.habitId })
      }
    },
    async deleteHabit ({ state, commit, dispatch }) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const obj = { habitId: state.theHabit.habitId }
        await _fetchHabitPost('/habit/deleteHabit', obj)
      } catch (error) {
        console.log(error)
        console.log('실패')
        return
      } finally {
        commit('updateState', {
          loading: false
        })
      }

      await dispatch('searchHabits')
    },
    async searchHabitRecordsOfTheYear ({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchHabit('/habit/searchHabitRecordsOfTheYear', payload)
        const attribute = []

        for (const element of res.data) {
          const attr = element
          const object = {
            customData: {
              class: attr.icon
            },
            dates: new Date(attr.date.substring(0, 4), Number(attr.date.substring(4, 6)) - 1, attr.date.substring(6))
          }
          attribute.push(object)
        }

        commit('updateState', {
          attributes: [...attribute]
        })
      } catch (error) {
        console.log(error)
        console.log('실패')
        return
      } finally {
        commit('updateState', {
          loading: false
        })
      }
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
