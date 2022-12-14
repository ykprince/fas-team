<template lang="">
  <div>
    <button type="button" @click="emitEvent"> + </button>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['showListToAdd'])

const emitEvent = () => {
  emit('showListToAdd')
}

</script>
<style lang="scss" scoped>
button {
  position: fixed;
  bottom: 5%;
  right: 5%;
  width: 5rem;
  height: 5rem;
  background: rgb(248, 248, 248);
  border-radius: 1rem 1rem 1rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 3px 3px 2px rgb(206, 206, 206);
  margin-right: 1rem;
}
</style>
