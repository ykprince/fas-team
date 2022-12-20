<template lang="">
  <div class="container">
    <view-info :id="id"></view-info>
  </div>
</template>
<script setup>
import viewInfo from '@/components/rollingPaper/view/viewInfo.vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    Type: Number,
    default: 0
  }
})
const router = useRouter()

if (props.id === 0 || props.id === '0') {
  alert('해당하는 페이지가 존재하지않습니다.')
  router.push({ name: 'rollingpaper' })
}
</script>
<style lang="scss" scoped>
.container{
  width:100%;
  max-width: 850px;
  height: 100%;
}
</style>
