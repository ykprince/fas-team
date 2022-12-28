<template>
    <div class="item" :class="theHabit.habitId==habit.habitId?'active':''" @click="itemClick(habit.habitId)">
        <span>{{ habit.title }}</span>
        <div class="icon" :class="[ habit.icon? habit.icon : '' ]"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    habit: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState('habit', [
      'theHabit'
    ])
  },
  methods: {
    itemClick (habitId) {
      // 습관 아이디로 아이템 조회하기
      this.$store.dispatch('habit/searchHabitWithId', {
        habitId: habitId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  position: relative;
  border: solid 1px #e1e1e1;
  border-radius: 3px;
  box-shadow: 0px 1px 2px #e1e1e1;
  background-color: white;
  height: 65px;
  margin-bottom: 5px;
  padding-left: 20px;
  align-items: center;
  font-size: 15px;
  color: darkgray;

  &:hover {
    font-weight: 500;
    font-size: 16px;
    color: gray;
    background-color: #f3f3f3;
    .icon {
      background-color: white;
    }
  }
  .icon {
    position: absolute;
    right: 20px;
    width: 40px;
    height: 40px;
    background: #f3f3f3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.active {
  font-weight: 500;
  font-size: 16px;
  color: gray;
  background-color: #f3f3f3;
  .icon {
    background-color: white;
  }
}

</style>
