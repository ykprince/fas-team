<template>
  <div class="habit-item-list">
    <HabitItem v-for="habit in habits" :key="habit.habitId" :habit="habit"/>
  </div>
</template>

<script>
import HabitItem from '../habit/HabitItem'

export default {
  components: {
    HabitItem
  },
  // db 테이블 생성 후에 연결할 것
  // computed: {
  //   ...mapState('habit', [
  //     'habits',
  //     'message',
  //     'loading'
  //   ])
  // }
  data () {
    return {
      habits: [
        { habitId: '1', title: '테스트1', description: '테스트입니다1테스트입니다1', icon: 'habitIcon1' },
        { habitId: '2', title: '테스트2', description: '테스트입니다2테스트입니다1', icon: 'habitIcon2' },
        { habitId: '3', title: '테스트3', description: '테스트입니다2테스트입니다1', icon: 'habitIcon3' },
        { habitId: '4', title: '테스트4', description: '테스트입니다2테스트입니다1', icon: 'habitIcon4' }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>

.habit-item-list {
  border-radius: 10px;
  background-color: #f3f3f3;
}

.habit-item-list>.item:first-child {
  margin-top:20px;
}
</style>
