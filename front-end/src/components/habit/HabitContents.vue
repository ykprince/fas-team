<template>
    <div>
      <ul class="nav nav-tabs" >
        <li class="nav-item" >
          <a class="nav-link"
            aria-current="page"
            href="#"
            :class="[{'active' : !calendarOn}, {'disabled' : !theHabitState}]"
            @click="ctrlNav">HABIT</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
          href="#"
          :class="[{'active' : calendarOn}, {'disabled' : !theHabitState}]"
          @click="ctrlNav">CALENDAR</a>
        </li>
      </ul>
      <div class="content"
        :class="!theHabitState?'disabled':''"
        v-if="calendarOn">
        <Calendar />
      </div>
      <div
        class="content"
        :class="!theHabitState?'disabled':''"
        v-if="!calendarOn">
        <div class="first-section">
          <div class="today-box">
            <div class="today">
              <div class="day">{{ today.date }}</div>
              <div class="year-month-box">
                <span class="today-string">TODAY</span>
                <span class="year-month">{{ today.year }}.{{ today.month }}</span>
              </div>
            </div>
          </div>
          <div class="icon-box">
              <div
                class="icon"
                v-for="icon in habitIcons"
                :id="icon"
                :key="icon"
                :class="[theHabit.icon==icon? 'clicked': '', icon?icon:'']"
                @click="iconClick"></div>
          </div>
        </div>
        <div class="second-section">
          <input
            class="title"
            type="text"
            v-model="theHabit.title"
            :disabled="!theHabitState">
          <textarea
            class="description"
            v-model="theHabit.content"
            :disabled="!theHabitState"></textarea>
        </div>
        <div>
          <HabitsOfThisWeek />
        </div>
        <div class="third-section">
          <button
            class="up"
            :disabled="!theHabitState"
            @click="updateHabit()">수정</button>
          <button
            class="del"
            :disabled="!theHabitState"
            @click="deleteHabit()">삭제</button>
        </div>
      </div>
      <div class="dim" v-if="confirmPop">
        <div class="confirm-popup" v-if="confirmPop">
          <span class="message">{{message}}</span>
          <div class="btn-box">
            <button class="up" @click="confirmPopCntl('do')">확인</button>
            <button class="del" @click="confirmPopCntl('cancel')">취소</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import HabitsOfThisWeek from './HabitsOfThisWeek.vue'
import Calendar from './Calendar.vue'

export default {
  data () {
    return {
      habitIcon: '',
      title: '',
      contents: '',
      confirmPop: false,
      message: '',
      process: ''
    }
  },
  components: {
    HabitsOfThisWeek,
    Calendar
  },
  computed: {
    ...mapState('habit', [
      'habits',
      'theHabit',
      'habitIcons',
      'today',
      'calendarOn',
      'attributes',
      'theRecord'
    ]),
    theHabitState () {
      let theHabitTf = true
      if (Object.keys(this.theHabit).length === 0) theHabitTf = false

      return theHabitTf
    }
  },
  updated () {
    console.log(this.theHabit.icon)
    // document.getElementById(this.theHabit.icon).className += ' clicked'
  },
  methods: {
    iconClick (e) {
      if (Object.keys(this.theHabit).length === 0) return
      this.theHabit.icon = e.target.id
    },
    updateHabit () {
      this.confirmPop = true
      this.message = '수정 하시겠습니까?'
      this.process = 'update'
    },
    deleteHabit () {
      // 삭제 하시겠습니까?
      this.confirmPop = true
      this.message = '삭제 하시겠습니까?'
      this.process = 'delete'
    },
    openPopup (b) {
      this.confirmPop = b
    },
    confirmPopCntl (btn) {
      this.confirmPop = false
      if (btn === 'cancel') return

      if (this.process === 'update') {
        this.$store.dispatch('habit/updateHabit', {
          habitId: this.theHabit.habitId,
          icon: this.theHabit.icon,
          title: this.theHabit.title,
          content: this.theHabit.content
        })
      } else if (this.process === 'delete') {
        this.$store.dispatch('habit/deleteHabit')

        // 스크롤 상단으로 올리기
        const list = document.getElementById('habitItemList')
        list.scrollTop = 0
      }
    },
    async ctrlNav (e) {
      if (e.target.innerHTML === 'CALENDAR') {
        await this.$store.commit('habit/updateState', {
          calendarOn: true
        })

        // 올해의 기록 조회 theHabit.habitId
        await this.$store.dispatch('habit/searchHabitRecordsOfTheYear', {
          habitId: this.theHabit.habitId,
          date: new Date().getFullYear()
        })
      } else {
        await this.$store.commit('habit/updateState', {
          calendarOn: false
        })
      }
    }
  },
  watch: {
    theHabit (val, oldVal) {
      console.log('val ', val)
      console.log('oldVal ', oldVal)
      console.log(this.theRecord)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");
@import '../../assets/scss/habit.scss';
.nav {
  margin-left: 20px;
  height: 42px;
}

.nav-item {
  width: 100px;
  height: 30px;
  font-size: 12px;
  color: gray;
}

.nav-link {
  color:#cecece;
  padding: 10px;

  &.active {
    color:gray !important;
  }

  &:hover {
    color:gray !important;
    border-bottom: none;
  }

  &:focus {
    color:gray !important;
    border-bottom: none;
  }
}

.content {
    display: flex;
    margin-left: 20px;
    padding-top: 15px;
    border-radius: 3px;
    box-sizing: border-box;
    font-size: 12px;
    color: darkgray;
    flex-direction: column;
    align-items: baseline;

    .third-section {
      margin-top: 10px;

      & > * {
        margin-right: 5px;
      }

      &:last-child {
        margin-right: 0px;
      }
    }

    .first-section {
      display: flex;
      align-items: baseline;
      flex-direction: column;

      .today-box {
        margin-right: 10px;
        margin-bottom: 10px;
      }

      .today {
        display: flex;
        position: relative;
        flex-direction: inherit;
        background-color: white;
        justify-content: center;
        align-items: center;
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        box-shadow: 0px 1px 2px #e1e1e1;

        .day {
          width: 60px;
          height: 60px;
          border-right: 1px solid #e1e1e1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 35px;
        }

        .year-month-box {
          width: 118px;
          height: 60px;
          background: #f3f3f3;
          display: flex;
          padding: 10px;
          flex-direction: column;
          justify-content: center;
          align-items: baseline;
        }

        .today-string {
          font-weight: bolder;
        }

      }

      .icon-box {
        display: flex;
        background: white;
        border: solid 1px #e1e1e1;
        border-radius: 3px;
        box-shadow: 0px 1px 2px #e1e1e1;
        background-color: white;
        align-items: center;
        font-size: 12px;
        color: darkgray;
        margin-bottom: 10px;

        .icon {
          width: 60px;
          height: 60px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid #e1e1e1;
        }

        .icon:last-child {
          border-right: none;
        }

        .clicked {
          background-color: #f3f3f3;
        }
      }

    }

    .second-section {
      display: flex;
      flex-direction: column;
      align-items: baseline;
      margin-bottom: 10px;
      width:100%;
      font-size: 13px;

      .title {
        width: 492px;
        height: 40px;
        margin-bottom: 5px;
        padding-left: 10px;

      }

      .description {
        width: 492px;
        height: 80px;
        padding: 10px;
      }
    }
}

button {
  border: solid 1px #e1e1e1;
  border-radius: 3px;
  box-shadow: 0px 1px 2px #e1e1e1;
  background-color: white;
  color: darkgray;
  height: 35px;
  width: 50px;
  font-size: 12px;

  &:hover {
    background-color: #f3f3f3;
  }
}

.dim {
  position:fixed;
  top:0;
  left:0;
  right: 0;
  display: flex;
  background-color: #00000026;
  z-index: 999;
  width:100%;
  height:100%;
  justify-content: center;
  align-items: center;
  color: darkgray;
  font-size: 12px;

  .confirm-popup {
    z-index: 9999;
    width: 300px;
    height: 150px;
    display: flex;
    border: solid 1px rgb(192, 192, 192);
    border-radius: 5px;
    background-color: white;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  .message {
    font-size: 15px;
    padding: 10px;
    width: 100%;
    height: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-box {
    padding: 11px;
    width: 100%;
    border-top: 1px solid #e1e1e1;

    & > * {
      margin-right: 5px;
    }

    &:last-child {
      margin-right: 0px;
    }
  }

  ::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
}

</style>
