<template lang="">
  <div>
    <div class="container" >
      <h2 class="text-center col-12">나만의 롤링페이퍼 만들기</h2>
      <!--1행-->
      <div class="d-flex justify-content-between title-row">
        <div class="col-7">
          <p class="inside-p-text col-12 text-start bold" >*제목을 입력해주세요(최대24글자)</p>
          <input type="text"
            :placeholder="customPlaceholder.title"
            v-model="title"
            autofocus="true" maxlength="24"
            @keyup="chkValidAvailable('title')">
          <span v-if="!validChk.title" class="color-red">제목을 입력해주세요.</span>
          <span v-if="titleChk" class="color-red">중복되는 제목은 사용할 수 없습니다.</span>
        </div>

        <div class="col-4">
          <p class="inside-p-text col-12 text-start">*만료일자 (내일부터 가능합니다.)</p>
          <input
            type="date"
            v-model="expireDate"
            @change="chkDate"
            class="col-12 p-2"
          >
          <span v-if="validChk.date === false" class="color-red">날짜는 내일부터 가능합니다.</span>
        </div>
      </div>

      <div class="col-12 second-row-paper title-row"><!--2행-->
        <p class="inside-p-text col-12 text-start">*롤링페이퍼에 대한 상세설명을 써주세요.</p>
        <input type="text"
        :placeholder="customPlaceholder.content"
        v-model="content"
        customMaxLength="100"
        @keyup="chkValidAvailable('content')"
        >
        <span v-if="!validChk.content" class="color-red">내용을 입력해주세요.</span>
      </div>

      <div class="col-12 button-area"><!--3행-->
        <button type="button" @click="chkValid" class="btn btn-lg text-dark">만들래요</button>
        <button type="button" @click="closeAdd" class="btn btn-lg text-dark">다시생각해볼래요</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const customPlaceholder = ref({
  title: '롤링페이퍼의 이름을 정해주세요.',
  content: '이 내용은 롤링페이퍼를 작성해주시는 분들에게 설명해줘요.'
})
const title = ref('')
const titleChk = computed(() => store.state.rollingPaper.searchResult)
const expireDate = ref('')
const content = ref('')
const validChk = ref({
  title: true,
  date: true,
  content: true
})
const store = useStore()

store.dispatch('getAllPapers')

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
  console.log(validChk.value)
  if (
    validChk.value.title === true &&
    validChk.value.content === true &&
    validChk.value.date === true
  ) {
    addNewPaper()
  } else {
    // 내용중 빈 값이 있을 경우
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
    title: title.value,
    date: expireDate.value,
    content: content.value
  }
  await store.dispatch('addNewPaper', dataObj)
  closeAdd()
}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;

  input {
  width: 100%;
  padding: 5px;
  font-size: 1.2rem;
}

  .title-row{
    min-height: 64px;
  }

  .color-red {
    display: inline-block;
    width:100%;
    text-align:left;
    padding-left: 0.2rem;
    color: tomato;
  }

  h2 {
    margin-top: 3rem;
    margin-bottom: 4rem;
  }

  p{
    font-size:1rem;
  }

  .inside-p-text{
    display: inline-block;
    font-size: 0.7rem;
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
      transition: 0.3s ease-in;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
