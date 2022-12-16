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
