<template>
    <div class="container">
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
        { habitId: '1', title: '테스트1', description: '테스트입니다1' },
        { habitId: '2', title: '테스트2', description: '테스트입니다2' }
      ]
    }
  }

}
</script>
