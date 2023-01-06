<template lang="">
  <div class="bg-area">
    <img :src="ballsAndStars" alt="데코 이미지1" class="small-img left-content">
    <img :src="bells" alt="데코 이미지2" class="small-img left-rotation right-content">
    <img :src="treeAndLight" alt="데코 이미지3" class="small-img">
  </div>
</template>
<script setup>
const ballsAndStars = require('@/assets/rollingpaper/balls_and_stars.png')
const bells = require('@/assets/rollingpaper/bells.png')
const treeAndLight = require('@/assets/rollingpaper/snowball-tree_and_light.png')
</script>
<style lang="scss" scoped>
.bg-area{
  position: relative;
  width: 100%;
  height: 100%;
}
.left-content {
  position: absolute;
  top: 30;
  left: 10;
}
.right-content{
  position: absolute;
  top:500;
  right:100;
}
.small-img {
  width: 100px;
}
.middle-img {
  width: 200px;
}
.large-img {
  width: 300px;
}
.left-rotation {
  transform: rotate(-0.1turn);
}
.right-roatation {
  transform: rotate(0.1turn);
}

</style>
