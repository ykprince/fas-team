<template>
  <div>
    <input
      :type="props.inputType"
      :placholder="props.customPlaceholder"
      :maxLength="props.customMaxLength"
    />
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  inputType: {
    Type: String,
    default: 'text'
  },
  customMaxLength: {
    Type: String,
    default: '24'
  },
  customPlaceholder: {
    Type: String,
    default: '입력해주세요.'
  }
})
</script>
<style scoped>
div {
  padding: 0;
  margin: 0;
}
input {
  width: 100%;
  height: 100%;
  padding: 5px;
  font-size: 16px;
}
</style>
