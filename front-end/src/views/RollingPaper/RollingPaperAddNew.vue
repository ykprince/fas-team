<template lang="">
  <div>
    <div class="container">
      <div :style="{'background-color': selectBackground}" class="border-radius">
        <img :src="topImg" alt="크리스마스 장식 이미지">

        <h2 class="text-center col-12 color-white">나만의 롤링페이퍼 만들기</h2>
        <!--1행-->
        <div class="d-flex justify-content-between title-row">
          <div class="col-7 ms-3">
            <p class="inside-p-text col-12 text-start bold color-white" >*제목을 입력해주세요(최대24글자)</p>
            <input type="text"
            :placeholder="customPlaceholder.title"
            v-model="title"
            autofocus="true" maxlength="24"
            @keyup="chkValidAvailable('title')">
            <div class="w-full">
              <span v-if="!validChk.title" class="color-red">제목을 입력해주세요.</span>
            </div>
            <div class="w-full">
              <span v-if="titleChk" class="color-red">중복되는 제목은 사용할 수 없습니다.</span>
            </div>
          </div>

          <div class="col-4 margin-right me-3">
            <p class="inside-p-text col-12 text-start color-white">*만료일자 (내일부터 가능합니다.)</p>
            <input
            type="date"
            v-model="expireDate"
            @change="chkDate"
            class="col-12 p-2"
            >
            <div  class="w-full">
              <span v-if="validChk.date === false" class="color-red">날짜는 내일부터 가능합니다.</span>
            </div>
          </div>
        </div>

        <div class="second-row-paper title-row  me-3 ms-3"><!--2행-->
          <p class="inside-p-text col-12 text-start color-white">*롤링페이퍼에 대한 상세설명을 써주세요.</p>
          <input type="text"
          :placeholder="customPlaceholder.content"
          v-model="content"
          customMaxLength="100"
          @keyup="chkValidAvailable('content')"
          >

          <div  class="w-full">
            <span v-if="!validChk.content" class="color-red">내용을 입력해주세요.</span>
          </div>
        </div>

        <select-color-comp @selectColor="selectColor"></select-color-comp>

        <div class="col-12 mb-3 button-area"><!--3행-->
          <button type="button" @click="chkValid" class="btn btn-lg color-white me-2" >만들래요</button>
          <button type="button" @click="closeAdd" class="btn btn-lg color-white" >다시생각해볼래요</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SelectColorComp from '@/components/rollingPaper/new/SelectColorComp.vue'
const topImg = require('@/assets/rollingpaper/chrismas-decoration.png')

const router = useRouter()
const customPlaceholder = ref({
  title: '롤링페이퍼의 이름을 정해주세요.',
  content: '이 내용은 롤링페이퍼를 작성해주시는 분들에게 설명해줘요.'
})
const title = ref('')
const titleChk = computed(() => store.state.rollingPaper.searchResult)
const expireDate = ref('')
const content = ref('')
const selectBackground = ref('tomato')
const validChk = ref({
  title: true,
  date: true,
  content: true
})
const store = useStore()

store.dispatch('getAllPapers')

const selectColor = (newBgColor) => {
  selectBackground.value = newBgColor
}

// 날짜 체크
const chkDate = () => {
  const todayDate = new Date().toISOString()
  if (todayDate < expireDate.value) {
    validChk.value.date = true
  } else {
    validChk.value.date = false
  }
}
// 유효성 검사
const chkValid = () => {
  title.value === '' ? (validChk.value.title = false) : (validChk.value.title = true)
  content.value === '' ? (validChk.value.content = false) : (validChk.value.content = true)
  chkDate()

  if (
    validChk.value.title === true &&
    validChk.value.content === true &&
    validChk.value.date === true
  ) {
    addNewPaper()
  } else {
    return false
  }
}
// onchange 유효성 검사
const chkValidAvailable = (type) => {
  if (type === 'title') {
    title.value.length > 0 ? validChk.value.title = true : validChk.value.title = false
    store.dispatch('searchPaperTitle', title.value) // title 중복체크
  } else if (type === 'content') {
    content.value.length > 0 ? validChk.value.content = true : validChk.value.content = false
  }
}

const closeAdd = () => {
  router.push({ name: 'rollingpaper' })
}

const addNewPaper = async () => {
  const dataObj = {
    rTitle: title.value,
    rContent: content.value,
    rStyle: selectBackground.value,
    rExpiredAt: expireDate.value
  }
  store.dispatch('addNewPaper', dataObj)
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;

  .bg-select-area{
    margin-top: 3rem;
    color: white;

    p {
      font-size: 1.3rem;
    }
    .bg-select-item{
      width: 6rem;
      color: white;
      border-radius: 0.5rem;

      &:not(:last-of-type) {
        margin-right: 1rem;
      }
    }
    .bg-active{
      background-color: white;
      color: black;
      font-weight: bold;
      border-radius: 1.5rem;
      transition-property: background-color;
      transition: ease-in;
      transition-duration: 0.2s;

    }
    label {
      width: 100%;
      display: inline-block;
      font-size: 1.3rem;
      transition-property: background-color;
      transition: ease-in;
      transition-duration: 0.1s;

      &:hover{
        font-weight: bold;
        background: white;
        color: black;
      }
    }

    input {
      display: none;
    }
  }

  .color-white{
    color:rgb(245, 245, 245);
  }

  input {
    width: 100%;
    padding: 5px;
    font-size: 1.2rem;
    border-radius: 5px;
    border: none;
  }

  .rounded-area {
    background: white;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 1rem 1rem 1rem;
    font-size: 1.2rem;
  }

  .border-radius {
    border-radius: 1rem 1rem 1rem;
  }

  .title-row{
    min-height: 64px;
  }

  .color-red {
    background-color: white;
    border-radius: 0.5rem;
    display: inline-block;
    text-align: left;
    padding-left: 0.2rem;
    color: tomato;
  }

  h2 {
    margin-top: 3rem;
    margin-bottom: 4rem;
  }

  .inside-p-text{
    display: inline-block;
    padding-left: 0.2rem;
    padding-bottom: 0;
    margin-bottom: 0.2rem;
  }

  .second-row-paper {
    margin-top: 3rem;
  }

  .button-area {
    margin-top: 3rem;

    button {
      padding: 0.5rem;
      border-radius: 0.8rem;
      background: white;
      color: black;
      transition-property: font-weight;
      transition: ease-in;
      transition-duration: 0.1s;

      &:hover {
        font-weight:bold;
        transition-property: font-weight;
        transition: ease-in;
        transition-duration: 0.1s;
      }
    }
  }

  .w-full {
    width: 100%;
    text-align: left;
    margin-top: 0.4rem;
  }
}

</style>
