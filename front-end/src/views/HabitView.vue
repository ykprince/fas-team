<template>
  <div class="container">
    <div class="yap">
    <HabitList class="col-md-4 habit-list"/>
    <HabitContents class="col-md-8 habit-content"/>
  </div>
  </div>
</template>

<script>
import HabitList from '../components/habit/HabitList.vue'
import HabitContents from '../components/habit/HabitContents.vue'

export default {
  components: {
    HabitList,
    HabitContents
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-family: 'Noto Sans KR', sans-serif;
}

.habit-list {
  display: inline-block;
  height: 400px;
  -ms-overflow-style: none;
}

.habit-list::-webkit-scrollbar{
  display:none;
}

.habit-content{
  display: inline-block;
}

.yap {
  display: flex;
}
</style>
