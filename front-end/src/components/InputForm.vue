<template>
  <div>
    <input
      :type="props.inputType"
      :placeholder="props.customPlaceholder"
      :maxLength="props.customMaxLength"
      :autofocus="props.customAutofocus"
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
  },
  customAutofocus: {
    Type: String,
    default: 'false'
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
  font-size: 1.2rem;
}
</style>
