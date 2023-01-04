<template>
  <div class="habit-item-list" id="habitItemList">
    <div class="habit-items">
        <div class="no-data" v-if="Object.keys(habits).length === 0">이 곳에 마우스를 올려 습관을 추가해 주세요.</div>
        <HabitItem
          v-for="habit in habits"
          :key="habit.habitId"
          :habit="habit"
          :id="habit.habitId"
          />
    </div>
    <HabitAddButton />
    <HabitAddPopup class="habitPop" v-if="openAddHabitPop"/>
    <div class="dim" v-if="openAddHabitPop"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HabitItem from '../habit/HabitItem'
import HabitAddButton from '../habit/HabitAddButton.vue'
import HabitAddPopup from '../habit/HabitAddPopup.vue'

export default {
  components: {
    HabitItem,
    HabitAddButton,
    HabitAddPopup
  },
  computed: {
    ...mapState('habit', [
      'habits',
      'openAddHabitPop'
    ])
  }
}
</script>

<style lang="scss" scoped>

.habit-item-list {
  overflow: scroll;
  width: 100%;
}

.habit-item-list .item:last-child {
  margin-bottom: 80px;
}

.habit-items {
  width: 100%;
  height: 100%;
}

.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 13px;
  color: gray;
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
  }

</style>
