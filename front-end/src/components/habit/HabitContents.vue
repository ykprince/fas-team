<template>
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">HABIT</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">CALENDAR</a>
        </li>
      </ul>
      <div class="content">
        <div class="first-section">
          <div class="today-box">
            <div class="today">
              <div class="day">{{ day }}</div>
              <div class="year-month-box">
                <span class="today-string">TODAY</span>
                <span class="year-month">{{ year }}.{{ month }}</span>
              </div>
            </div>
          </div>
          <div class="icon-box">
              <div
                class="icon"
                v-for="icon in habitIcons"
                :id="icon"
                :key="icon"
                :class="theHabit.icon==icon?icon+' clicked':icon"
                @click="iconClick"></div>
          </div>
        </div>
        <div class="second-section">
          <input class="title" type="text" :value="theHabit.title">
          <textarea class="description" :value="theHabit.description"></textarea>
        </div>
        <div>
          <HabitsOfThisWeek />
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import HabitsOfThisWeek from '../habit/HabitsOfThisWeek.vue'

export default {
  components: {
    HabitsOfThisWeek
  },
  data () {
    const date = new Date()

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    }
  },
  computed: {
    ...mapState('habit', [
      'theHabit',
      'habitIcons'
    ])
  },
  methods: {
    iconClick (e) {
      this.theHabit.icon = e.target.id
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css");

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
    height: 400px;
    margin-left: 20px;
    padding-top: 15px;
    border-radius: 3px;
    box-sizing: border-box;
    font-size: 12px;
    color: darkgray;
    flex-direction: column;
    align-items: baseline;

    .first-section {
      display: flex;
      align-items: baseline;
      flex-direction: column;

      .today-box {
        margin-right: 10px;
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
        margin-bottom: 10px;

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
</style>
