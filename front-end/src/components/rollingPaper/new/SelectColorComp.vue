<template lang="">
  <div class="me-3 ms-3 bg-select-area">
    <p class="inside-p-text col-12 text-start">이런 배경은 어때요?</p>
    <div class="item-list" >
      <div class="bg-select-item">
        <label for="tomato" @click="selectColor" class="bg-active">빨간색</label>
        <label for="seagreen" @click="selectColor" class="">초록색</label>
        <label for="royalblue" @click="selectColor">파란색</label>
        <label for="darkviolet" @click="selectColor">보라색</label>
        <label for="darkslategrey" @click="selectColor" class="">검정색</label>

      </div>
      <div class="d-hidden">
        <input type="radio" name="tomato" id="tomato" value="tomato" checked v-model="selectBackground" @change="changedValue" />
        <input type="radio" name="seagreen" id="seagreen" value="seagreen"  v-model="selectBackground" @change="changedValue" />
        <input type="radio" name="royalblue" id="royalblue" value="royalblue"  v-model="selectBackground" @change="changedValue" />
        <input type="radio" name="darkviolet" id="darkviolet" value="darkviolet"  v-model="selectBackground" @change="changedValue" />
        <input type="radio" name="darkslategrey" id="darkslategrey" value="darkslategrey"  v-model="selectBackground" @change="changedValue" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, computed } from 'vue'
const emit = defineEmits(['selectColor'])
const selectBackground = ref('tomato')
const emitColor = computed(() => selectBackground.value)
console.log(emitColor)
const changedValue = () => {
  emit('selectColor', selectBackground.value)
}

const selectColor = (event) => {
  const labels = document.querySelectorAll('.bg-select-item label')
  labels.forEach(label => {
    label.classList.remove('bg-active')
  })
  event.target.classList.add('bg-active')
}
</script>
<style lang="scss" scoped>
  .bg-select-area{
    .item-list{
      height: 3rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 1px solid whitesmoke;
      border-radius: 5px 5px 5px;
    }
    .bg-select-item{
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 1px solid whitesmoke;
      border-radius: 5px 5px 5px;

        label {
          flex: 1;
        display: inline-block;
        height: 3rem;
        text-align:center;
        line-height: 3rem;

        &:hover {
          cursor: pointer;
        }
        }
    }

    .bg-active{
      font-weight: bold;
      background-color: white;
      border-radius: 0.5rem 0.5rem 0.5rem;
      color: rgb(51, 51, 51);
      transition-property: background-color;
      transition: ease-in;
      transition-duration: 0.2s;
    }
    label {
      flex:1;
      display: inline-block;
      font-size: 1.3rem;

      &:hover{
        font-weight: bold;
        background: white;
        color: black;
        cursor: pointer;
      }
    }

    input {
      display: none;
    }
  }
</style>
