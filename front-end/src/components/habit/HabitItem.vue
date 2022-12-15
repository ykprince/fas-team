<template>
    <div class="item">
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
  }
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  background-color: white;
  height: 55px;
  margin: 10px 20px;
  padding-left: 20px;
  // border-radius: 10px;
  align-items: center;
  // border: solid 2px lightgray;
  font-size: 12px;
  color: darkgray;
  position:relative;

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
</style>
