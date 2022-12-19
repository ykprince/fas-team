<template>
    <div class="item" @click="itemClick">
        <span>{{ habit.title }}</span>
        <div class="icon" :class="[ habit.icon? habit.icon : '' ]"></div>
    </div>
</template>

<script>
export default {
  props: {
    habit: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    itemClick (e) {
      // 조회
      const habit = { habitId: e.target.id }
      this.addFocusing(habit)

      // 습관 아이디로 아이템 조회하기
      this.$store.dispatch('habit/searchHabitWithId', {
        habitId: habit.habitId
      })
    },
    addFocusing (habit) {
      const activatedItems = document.getElementsByClassName('active')

      for (const element of activatedItems) {
        const item = element
        item.classList.remove('active')
      }

      const itemForFocusing = document.getElementById(habit.habitId)
      itemForFocusing.className += ' active'
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
  height: 55px;
  margin-bottom: 5px;
  padding-left: 20px;
  align-items: center;
  font-size: 12px;
  color: darkgray;

  &:hover {
    font-weight: 500;
    font-size: 13px;
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

  .habitIcon1::after {
    content: "●";
    font-size: 20px;
    color: $blue;
  }
  .habitIcon2::after {
    content: "●";
    font-size: 20px;
    color: $blue;
  }
  .habitIcon3::after {
    content: "●";
    font-size: 20px;
    color: $blue;
  }
  .habitIcon4::after {
    content: "●";
    font-size: 20px;
    color: $blue;
  }

}

.active {
  font-weight: 500;
  font-size: 13px;
  color: gray;
  background-color: #f3f3f3;

  .icon {
    background-color: white;
  }
}

// .active::before {
//   content: "";
//   position: absolute;
//   right: 20px;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   outline: 3px solid $blue;
// }
</style>
