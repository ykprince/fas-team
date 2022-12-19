<template lang="">
  <div>
    this is view
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { created } from 'vue'
const router = useRouter()

created(() => {
  console.log(router)
})
</script>
<style lang="">

</style>
