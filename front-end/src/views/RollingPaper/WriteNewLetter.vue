<template lang="">
  <div class="container">
    <div class="writing-section">
      <write-letter :id="NumberId"></write-letter>
    </div>
  </div>
</template>
<script setup>
import WriteLetter from '@/components/rollingPaper/new/writeLetter.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const NumberId = ref(0)
const id = new URLSearchParams(location.search).get('id')

if (id === '' || !id) {
  alert('해당하는 페이지가 존재하지않습니다.')
  router.push({ name: 'rollingpaper' })
} else {
  NumberId.value = Number(id)
}
</script>
<style lang="scss" scoped>

</style>
