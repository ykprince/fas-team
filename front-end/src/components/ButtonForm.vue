<template lang="">
  <div>
    <button type="button" :class="{ 'w-full': props.widthFull}" @click="emitEvent">{{props.btnText}}</button>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const emit = defineEmits(['emitEvent'])
const props = defineProps({
  btnText: {
    Type: String,
    default: '버튼'
  },
  widthFull: {
    Type: Number,
    default: true
  },
  emitEvent: {
    Type: String,
    default: 'emitEvent'
  }
})

const emitEvent = () => {
  emit('emitEvent')
}

</script>
<style lang="scss" scoped>
.w-full {
  flex: 1;
}
button {
  padding: 1.3rem 1.3rem 0 1.3rem;
  border: none;
  border-radius: 0.5rem 0.5rem 0.5rem;
  background-color: inherit;
  font-size: 1.4rem;
  transition: 0.2s ease-out;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
  }
}
</style>
