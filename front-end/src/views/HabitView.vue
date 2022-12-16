<template>
  <div class="container">
    <div class="yap">
      <div class="left-section col-md-4">
        <HabitList class="habit-list"/>
        <HabitAddButton @openPop="openPop" />
        <div>
          <HabitAddPopup class="habitPop" v-if="clicked" />
        </div>
      </div>
      <HabitContents class="col-md-8 habit-content"/>
    </div>
    <div class="dim" v-if="clicked"></div>
  </div>
</template>

<script>
import HabitList from '../components/habit/HabitList.vue'
import HabitContents from '../components/habit/HabitContents.vue'
import HabitAddButton from '../components/habit/HabitAddButton.vue'
import HabitAddPopup from '../components/habit/HabitAddPopup.vue'

export default {
  components: {
    HabitList,
    HabitContents,
    HabitAddButton,
    HabitAddPopup
  },
  data () {
    return {
      clicked: false
    }
  },
  methods: {
    openPop (value) {
      this.clicked = value
      console.log('click')
      console.log(this.clicked)
    }
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

.left-section {
  position: relative;

  &:hover>.unclicked {
    background-color: white;
    color: rgb(192, 192, 192);
    box-shadow: 0px 0px 8px -3px #8a8a8a;
  }
}

.dim {
  position:fixed;
  top:0;
  left:0;
  right: 0;
  display: flex;
  background-color: #00000071;
  z-index: 999;
  width:100%;
  height:100%;
}

</style>
