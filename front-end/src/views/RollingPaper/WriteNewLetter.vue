<template lang="">
  <div class="container">
    <div class="writing-section">
      <write-letter :id="props.id"></write-letter>
    </div>
    <div>

    </div>
  </div>
</template>
<script setup>
import WriteLetter from '@/components/rollingPaper/new/writeLetter.vue'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps({
  id: {
    default: 0,
    Type: Number
  }
})
const router = useRouter()
const store = useStore()
// 값확인
if (props.id === 0 || props.id === '0') {
  alert('해당하는 페이지가 존재하지않습니다.')
  router.push({ name: 'rollingpaper' })
} else {
  store.dispatch('checkPaperAvailable', props.id)

  // store.dispatch('getAllPapers')
  // store.dispatch('getOnePaper', props.id)
}

</script>
<style lang="scss" scoped>

</style>
