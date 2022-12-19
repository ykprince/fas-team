<template lang="">
  <div>
    {{rollingpaperObj}}
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { defineProps, computed } from 'vue'
const props = defineProps({
  id: {
    Type: Number,
    default: 0
  }
})

const store = useStore()
const rollingpaperObj = computed(() => store.state.rollingPaper.all)
store.dispatch('getAllPapers')
store.dispatch('getOnePaper', props.id)

console.log(rollingpaperObj)
console.log(props.id)

</script>
<style lang="">

</style>
