<template lang="">
  <div>
    Spinning 넣기~
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const route = useRouter()
const store = useStore()
const code = new URLSearchParams(location.search).get('code')
const auth = computed(() => store.state.auth.auth)

store.dispatch('auth/kakaoLogin', code)

watch(() => auth.value, (newValue, oldValue) => {
  if (auth.value.uid) {
    route.replace('/')
  }
})

</script>
<style lang="">

</style>
