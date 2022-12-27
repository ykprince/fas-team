<template>
    <button class="add-btn" :class="openAddHabitPop?'clicked':'unclicked'" @click="btnClick"></button>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('habit', [
      'openAddHabitPop'
    ])
  },
  methods: {
    btnClick () {
      let clicked = false
      if (!this.openAddHabitPop) clicked = true

      this.$store.commit('habit/updateState', {
        openAddHabitPop: clicked
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.add-btn {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 20%;
    right: 10px;
    bottom: 52px;
    transition: all 0.2s;
    color: rgb(192, 192, 192);
    z-index: 1000;

    &:after {
      font-family: bootstrap-icons;
      content: "\f64d";
      font-size: 20px;
      font-weight: 700;
    }
}

.unclicked {
    background-color: #f3f3f300;
    border: none;
    box-shadow: 1px 2px 7px -3px #f3f3f300;
    color: #f3f3f300;

    &:hover {
        border: solid 5px rgb(192, 192, 192);
    }
}

.clicked {
    background-color: white;
    border: solid 5px rgb(192, 192, 192);
    box-shadow: 1px 2px 7px -3px #f3f3f300;
    transition: all 0.3s;

    &::after {
        display:block;
        transform: rotate(45deg);
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.377);
        color:white;
        border:solid 5px rgba(0, 0, 0, 0);
    }

}

</style>
