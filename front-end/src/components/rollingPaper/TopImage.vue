<template lang="">
  <div>
    <img :src="topImage" alt="크리스마스 이미지">
  </div>
</template>
<script setup>
const topImage = require('@/assets/rollingpaper/chrismas-decoration.png')
</script>
<style lang="scss" scoped>
div {width:100%; display: block; margin-bottom: 5rem; text-align:center;}
img { width: 100%; }
</style>
