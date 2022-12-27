<template lang="">
  <div class="container" :style="{'background-color':bgColor}">
    <img :src="topImage" alt="크리스마스 장식 이미지" class="top-image" >

    <div class="first container-list mt-3">
      <p>작성자분의 성함은 어떻게 되시나요?</p>
      <input type="text" placeholder="제 이름은요" v-model="formData.name" maxlength="20" @keydown="fncVertifyChk('name')">
      <p class="error"  v-show="!vertifyChk.name">작성자의 성함을 기입해주세요</p>
    </div>
    <div class="second container-list" >
      <p>언제부터 이 쪽지를 볼 수 있을까요?</p>
      <input type="date" v-model="formData.date" @change="checkDate">
      <p class="error"  v-show="!vertifyChk.date">날짜는 내일부터 가능합니다</p>
    </div>

    <div class="third container-list">
      <div class="label-area">
        <label for="open" class="radio-check active" @click="updateRadio">모두가 봐도 괜찮아요</label>
        <label for="hide" class="radio-check" @click="updateRadio">비밀로 할래요</label>
      </div>
      <div>
        <input type="radio" name="hiddenYn" id="open" value="false" checked  v-model="formData.hiddenYn" class="" v-show="false">
        <input type="radio" name="hiddenYn" id="hide" value="true" v-model="formData.hiddenYn" v-show="false">
      </div>
    </div>

    <select-color-comp @selectColor="selectColor" class="select-color-comp"></select-color-comp>

    <div class="forth container-list">
      <p>올해의 마지막을 써주세요</p>
      <textarea name="" id="" cols="30" rows="10" placeholder="한 해동안 수고한 당신에게."  v-model="formData.content" @keydown="fncVertifyChk('content')"></textarea>
      <p class="error" v-show="!vertifyChk.content">내용을 기입해주세요</p>

    </div>

    <div class="last container-list" >
      <button type="button" @click="checkVertify" >전송</button>
    </div>

  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { ref, defineProps } from 'vue'
import SelectColorComp from './SelectColorComp.vue'
const topImage = require('@/assets/rollingpaper/chrismas-decoration.png')
const props = defineProps({
  id: {
    default: 0,
    Type: Number
  }
})
const bgColor = ref('tomato')
const store = useStore()
const formData = ref({
  id: props.id,
  name: '',
  date: '',
  hiddenYn: false,
  content: '',
  style: bgColor.value
})
const today = new Date().toISOString()
const vertifyChk = ref({
  name: true,
  date: true,
  content: true
})

const selectColor = (newColor) => {
  bgColor.value = newColor
}

const fncVertifyChk = (type) => {
  if (type === 'name') {
    vertifyChk.value.name = true
  }
  if (type === 'content') {
    vertifyChk.value.content = true
  }
}

const checkDate = () => {
  if (formData.value.date === '') {
    vertifyChk.value.date = false
    return false
  } else {
    vertifyChk.value.date = true
  }
  if (formData.value.date <= today) {
    vertifyChk.value.date = false
    return false
  }
}

const checkVertify = () => {
  checkDate()
  formData.value.name === '' ? vertifyChk.value.name = false : vertifyChk.value.name = true
  formData.value.content === '' ? vertifyChk.value.content = false : vertifyChk.value.content = true

  if (vertifyChk.value.name === true && vertifyChk.value.date === true && vertifyChk.value.content === true) {
    addNewLetter()
  }
}

const addNewLetter = () => {
  store.dispatch('addNewLetter', formData.value)
}

const updateRadio = (event) => {
  const radios = document.querySelectorAll('.radio-check')
  radios.forEach((item) => { item.classList.remove('active') })
  event.target.classList.add('active')
}
</script>
<style lang="scss" scoped>

p {
  margin-bottom: 0;
}
input, textarea {
  border: none;
}
.container {
  font-size: 1.5rem;
  max-width:500px;
  color: white;
  border:none;
  border-radius: 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .top-image{
    width: 70%;
  }

  .container-list{
    width: 70%;
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    text-align: left;

    input {
      height: 5rem;
      padding: 0.5rem;
    }

    .label-area{
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 1px solid whitesmoke;
      border-radius: 5px 5px 5px;

      label {
        flex: 1;
        font-size: 1.5rem;
        display: inline-block;
        height: 5rem;
        text-align:center;
        line-height: 5rem;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .forth {
    textarea {
      padding: 10px;
    }
  }

  .last {
    button {
      background-color: inherit;
      width: 100%;
      height: 100%;
      padding: 0.6rem 0;
      color: white;
      border: 1px solid white;
      border-radius: 5px 5px 5px;
      transition-property: background-color, color, font-weight;
      transition: ease-in;
      transition-duration: 0.2s;

      &:hover {
        background-color: white;
        color: rgb(78, 78, 78);
        font-weight: bold;
        transition-property: background-color, color, font-weight;
        transition: ease-in;
        transition-duration: 0.2s;

        &::after{
          content: '할게요!';
        }
      }
    }
  }

}
.active{
  font-weight: bold;
  background-color: white;
  border-radius: 0.5rem 0.5rem 0.5rem;
  color: rgb(51, 51, 51);
  transition-property: background-color;
  transition: ease-in;
  transition-duration: 0.2s;
}

.error{
  background-color: white;
  color: rgb(255, 71, 71);
  font-size: 1rem;
  width: fit-content;
  padding: 1px 5px;
  border-radius: 5px 5px 5px;
  margin-top: 2px;
}

//컴포넌트
.select-color-comp{
  width: 70%;
  margin-bottom: 2.5rem;
}
</style>
