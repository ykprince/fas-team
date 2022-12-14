<template lang="">
  <div class="modal-bg-black" @click="closeAdd">
    <div class="container" @click.stop="">
      <!--1행-->
      <input-form inputType="text" customPlaceholder="제목을입력해주세요" :value="title"></input-form>
      <span v-if="!validChk.title" class="color-red">제목을 입력해주세요.</span>
   <!--2행-->
      <div>
        <div>
          <input-form inputType="text" customPlaceholder="마감일자" :value="releaseDate" ></input-form>
        </div>
        <div>
          <input-form inputType="date" :value="releaseDate"></input-form>
        </div>
      </div>

      <div><!--3행-->
        <textarea id="" cols="30" rows="10" :value="content"></textarea>
        <span v-if="!validChk.content" class="color-red">내용을 입력해주세요.</span>
      </div>

      <div><!--4행-->
        <input type="radio" name="hiddenYn" id="hiddenY" value="true" checked @change="updateHiddenChk">
        <label for="hiddenYn">비밀로보낼래요.</label>
        <input type="radio" name="hiddenYn" id="hiddenN" value="false" @change="updateHiddenChk">
        <label for="hiddenYn">모두에게보일래요.</label>
      </div>

      <div><!--5행-->
        <button @click="chkValid">보낼래요</button>
        <button @click="closeAdd">다시생각해볼게요</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import inputForm from '@/components/InputForm.vue'
import { ref, defineEmits } from 'vue'
const title = ref('')
const name = ref('')
const releaseDate = ref(new Date())
const hiddenYn = ref('true')
const content = ref('')
const validChk = {
  title: true,
  name: true,
  content: true
}
const emit = defineEmits(['closeNewRollingPaperModal'])

const updateHiddenChk = (e) => {
  hiddenYn.value = e.target.value
}

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
.modal-bg-black {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
</style>
