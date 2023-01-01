<template lang="">
  <div>
    Spinning 넣기~
  </div>
</template>
<script setup>
import { useStore } from 'vuex'

const store = useStore()
const code = new URLSearchParams(location.search).get('code')
store.dispatch('auth/kakaoLogin', code)
console.log(code)
</script>
<style lang="">

</style>
