<template lang="">
  <div class="container">
    <div class="container-header">
      <h1>비밀번호 확인</h1>
    </div>
    <div>
      <form @submit.prevent="verifyChk">
        <div class="form-floating">
          <input
          type="password"
          v-model="password.value"
          @keyup.enter="verifyChk"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          maxlength="30"
          >
          <label for="floatingPassword">비밀번호를 입력해주세요</label>
        </div>
        <div>
          <p v-show="!password.status" class="error-text">{{password.text}}</p>
        </div>

        <button type="submit" class="btn btn-light col-12 mt-5 submit-btn">확인</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
import { useStore } from 'vuex'
const emit = defineEmits()
const store = useStore()
const password = ref({
  value: '',
  status: true,
  text: ''
})
const verifyChk = async () => {
  if (password.value.value.length < 1) {
    password.value.text = '비밀번호를 입력해주세요'
    password.value.status = false
  } else {
    const rs = await store.dispatch('auth/myPagePasswordCheck', password.value.value)

    if (rs === 0) {
      password.value.text = '비밀번호가 틀렸습니다.'
      password.value.status = false
    } else {
      password.value.status = true
    }

    if (password.value.status === true && rs === true) {
      console.log('emitted passwordCheckPassed')
      emit('passwordCheckPassed')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    max-width: 450px;
    min-width: 200px;

    .container-header{
      margin-top: 100px;
      margin-bottom: 100px;
    }
    input{
      height: 45px;
    }
    .submit-btn {
      height: 35px;
    }
    .error-text{
      padding-top: 10px;
      color: tomato;
      padding-left: 0;
      margin: auto 0;
      text-align: left;
    }
  }
  h1 {
    color: var(--bs-nav-link-disabled-color);
  }
</style>
