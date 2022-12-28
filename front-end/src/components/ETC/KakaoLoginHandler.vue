<template lang="">
  <div>
    Spinning 넣기~
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const code = new URL(window.location.href).searchParams.get('code')
const result = store.dispatch('oAuths/kakaoLogin', code)
console.log(result)
</script>
<style lang="">

</style>
