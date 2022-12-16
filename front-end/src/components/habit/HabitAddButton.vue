<template>
    <button class="add-btn" :class="clicked?'clicked':'unclicked'" @click="btnClick"></button>
</template>
<script>
export default {
  data () {
    return {
      clicked: false
    }
  },
  emits: [
    'openPop'
  ],
  methods: {
    btnClick () {
      if (this.clicked) {
        this.clicked = false
      } else {
        this.clicked = true
      }

      this.$emit('openPop', this.clicked)
    }
  }
}
</script>
<style lang="scss" scoped>

.add-btn {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 20%;
    right: 10px;
    bottom: 10px;
    transition: all 0.2s;
    color: rgb(192, 192, 192);
    z-index: 1000;

    &:after {
        content:"+";
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
