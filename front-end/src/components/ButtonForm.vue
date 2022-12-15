<template lang="">
  <div>
    <button type="button" :class="{ 'w-full': props.widthFull}" >{{props.text}}</button>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    Type: String,
    default: '버튼'
  },
  widthFull: {
    Type: Number,
    default: true
  }
})

</script>
<style lang="scss" scoped>
.w-full {
  flex: 1;
}
button {
  padding: 1.5rem;
  border: 1px solid black;
  border-radius: 0.5rem 0.5rem 0.5rem;
}
</style>
