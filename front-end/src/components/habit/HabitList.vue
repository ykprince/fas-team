<template>
  <div id="habitItemList" class="habit-item-list">
      <HabitItem
        v-for="habit in habits"
        :key="habit.habitId"
        :habit="habit"
        :id="habit.habitId"
        />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HabitItem from '../habit/HabitItem'

export default {
  components: {
    HabitItem
  },
  // db 테이블 생성 후에 연결할 것
  computed: {
    ...mapState('habit', [
      'habits'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.habit-item-list {
  overflow: scroll;
  width: 100%;
}

.habit-item-list>.item:last-child {
  margin-bottom: 80px;
}

</style>
