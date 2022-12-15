<template lang="">
  <div class="modal-background" @click="fncEmit('cancelEmit')">
    <div class="modal-container" @click.stop="">
      <div class="text-area">
        <p>{{props.modalText}}</p>
      </div>
      <div class="btn-area">
        <button-form :widthFull="props.widthFull" :btnText="btnText1" @emitEvent="fncEmit('submitEmit')"></button-form>
        <button-form :widthFull="props.widthFull" :btnText="btnText2" @emitEvent="fncEmit('cancelEmit')"></button-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import ButtonForm from './ButtonForm.vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['submitEmit'])

const fncEmit = (text) => {
  emit(text)
}

const props = defineProps({
  modalText: { // 텍스트 내용 지정
    Type: String,
    default: '텍스트'
  },
  btnText1: { // 버튼1 텍스트 내용 지정
    Type: String,
    default: '버튼'
  },
  btnText2: { // 버튼2 텍스트 내용 지정
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
  align-items:center;     //수직 중앙정렬
  position:fixed;         // 포지션 픽스, 화면이 스크롤되더라도 고정되기 위함
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 999;
  padding: 0;
  margin: 0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.3);

  .modal-container {
    margin: auto;
    margin-top: 20%;
    width: 24rem;
    height: 12rem;
    background-color: #f5f5f5;
    border-radius: 1rem 1rem 1rem;
    border: none;

    .text-area {
      width: 100%;
      height: 60%;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }

    .btn-area {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-evenly;
    bottom: 1rem;
    margin-bottom: 1rem;
  }
  }
}

</style>
