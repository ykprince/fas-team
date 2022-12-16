<template lang="">
  <div>
    <div class="container" >
      <!--1행-->
      <input-form :customPlaceholder="customPlaceholder" :value="title"></input-form>
      <span v-if="!validChk.title" class="color-red">제목을 입력해주세요.</span>
      <!--2행-->
      <div>
          <input-form inputType="date" :value="releaseDate"></input-form>
      </div>

      <div><!--3행-->
        <textarea id="" cols="30" rows="10" :value="content"></textarea>
        <span v-if="!validChk.content" class="color-red">내용을 입력해주세요.</span>
      </div>
      <div><!--5행-->
        <button @click="chkValid">만들게요</button>
        <button @click="closeAdd">다시생각해볼게요</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import inputForm from '@/components/InputForm.vue'
import { ref, defineEmits } from 'vue'
const customPlaceholder = ref('롤링페이퍼의 이름을 입력해주세요.')
const title = ref('')
const name = ref('')
const releaseDate = ref(new Date())
const content = ref('')
const validChk = {
  title: true,
  name: true,
  content: true
}
const emit = defineEmits(['closeNewRollingPaperModal'])

const chkValid = () => {
  title.value === '' ? (validChk.title = false) : (validChk.title = true)
  name.value === '' ? (validChk.name = false) : (validChk.name = true)
  content.value === '' ? (validChk.content = false) : (validChk.content = true)

  if (
    validChk.title === true &&
    validChk.name === true &&
    validChk.content === true
  ) {
    // 모든 내용이 기입 되었을 경우
  } else {
    // 내용중 빈 값이 있을 경우
    return false
  }
}

const closeAdd = () => {
  const modalExit = false
  emit('closeNewRollingPaperModal', modalExit)
}
</script>
<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
