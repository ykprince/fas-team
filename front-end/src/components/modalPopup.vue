<template lang="">
  <div class="modal-background">
    <div class="modal-container">
      <div>
        <p>{{props.modalText}}</p>
      </div>
      <div>
        <button-form :widthFull="props.widthFull" :btnText="btnText" @click="submitEmit"></button-form>
        <button-form :widthFull="props.widthFull" :btnText="btnText"></button-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import ButtonForm from './ButtonForm.vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['submitEmit'])

const submitEmit = () => {
  emit('submitEmit')
}

const props = defineProps({
  modalText: {
    Type: String,
    default: '텍스트'
  },
  btnText: {
    Type: String,
    default: '버튼'
  },
  btnWidth: {
    Type: Number,
    default: true
  }
})
</script>
<style lang="scss" scoped>
.modal-background{
  z-index: 999;
  padding: 0;
  margin: 0;
  width:100%;
  height:100%;
  background-color: #000000;

  .modal-container {
    width: 30rem;
    height: 10rem;
    background-color: #f5f5f5;
    border-radius: 1rem 1rem 1rem;
    border: none;
  }
}
</style>
