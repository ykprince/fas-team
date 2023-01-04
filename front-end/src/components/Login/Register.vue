<template lang="">
  <div>
    <h1>회원가입하기</h1>
    <div class="regist-form">
      <div class="form-floating writing-form">
        <input type="text" class="form-control" id="id" autofocus v-model="verifys.id.value" @keyup="verifyId" @change="chkIdAvailable" maxlength="30">
        <label for="id">사용하실 아이디 혹은 이메일을 입력해주세요 (4자 이상)</label>
        <p class="error" v-if="!verifys.id.chk">{{verifys.id.text}}</p>
        <p class="passed" v-if="verifys.id.dbChk">{{verifys.id.text}}</p>
      </div>
      <div class="form-floating writing-form">
        <input type="text" class="form-control" id="name" v-model="verifys.name.value" @keyup="verifyName" maxlength="20">
        <label for="name">이름을 입력해주세요</label>
        <p class="error" v-if="!verifys.name.chk">{{verifys.name.text}}</p>
      </div>
      <div class="form-floating writing-form">
        <input type="password" class="form-control" id="password" v-model="verifys.pw.value" @keyup="verifyPw" maxlength="30">
        <label for="password">비밀번호를 입력해주세요</label>
        <p class="error" v-if="!verifys.pw.chk">{{verifys.pw.text}}</p>
      </div>
      <div class="form-floating writing-form">
        <input type="password" class="form-control" id="passwordChk" v-model="verifys.pwChk.value" @keyup="verifyPwChk" maxlength="30">
        <label for="passwordChk">비밀번호 확인</label>
        <p class="error" v-if="!verifys.pwChk.chk">{{verifys.pw.text}}</p>
      </div>
    </div>
    <div class="btn-area">
      <button @click="registChk" class="btn btn-light regist-btn block" type="button">회원가입 할게요</button>

      <img :src="KAKAO_REGIST_IMG" alt="카카오로 회원가입하기 버튼" @click="registerChk" class="block">

      <button>구글로 시작하기</button>
    </div>
    <spinner-vue v-if="loading"></spinner-vue>
  </div>
</template>
<script setup>
import SpinnerVue from '../habit/Spinner.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const KAKAO_REGIST_IMG = require('@/assets/kakao_regist_large_wide.png')
const store = useStore()
const route = useRouter()
const verifys = ref({
  id: {
    value: '',
    chk: true,
    dbChk: false,
    text: ''
  },
  name: {
    value: '',
    chk: true,
    text: '이름을 입력해주세요'
  },
  pw: {
    value: '',
    chk: true,
    text: ''
  },
  pwChk: {
    value: '',
    chk: true
  }
})
const loading = computed(() => store.state.auth.loading)

const registerChk = async () => { // 카카오로 시작하기
  store.dispatch('auth/kakaoAuthorize')
}

const registChk = async () => { // 회원가입 버튼 클릭 이벤트
  await verifyChk()

  if (verifys.value.id.chk && verifys.value.pw.chk && verifys.value.pwChk.chk) {
    const loginInfo = {
      id: verifys.value.id.value,
      name: verifys.value.name.value,
      password: verifys.value.pw.value
    }
    const rs = await store.dispatch('auth/registWithId', loginInfo)
    if (rs === 'verify-failure') {
      alert('입력정보를 확인해주세요.')
      return false
    } else if (rs === 1) {
      console.log('성공!')
      route.replace('/auth/login')
    }
  } else {
    return false
  }
}

const verifyName = async () => { // 이름 체크
  verifys.value.name.chk = verifys.value.name.value !== ''
}

const verifyId = async () => { // id유효성검사
  verifys.value.id.dbChk = false // passed

  if (verifys.value.id.value === '') {
    verifys.value.id.text = '아이디를 입력해주세요.'
    verifys.value.id.chk = false
    return false
  } else {
    verifys.value.id.chk = true
  }
  if (verifys.value.id.value.length < 4) {
    verifys.value.id.chk = false
    verifys.value.id.text = '아이디 및 이메일은 4글자 이상이어야합니다.'
    return false
  } else {
    verifys.value.id.chk = true
  }
}

const verifyPw = async () => { // pw유효성검사
  if (verifys.value.pw.value.length < 4) {
    verifys.value.pw.chk = false
    verifys.value.pw.text = '비밀번호는 4글자 이상이어야합니다.'
  } else {
    verifys.value.pw.chk = true
  }
  if (verifys.value.pw.value === '') {
    verifys.value.pw.chk = false
    verifys.value.pw.text = '비밀번호를 입력해주세요.'
  } else {
    verifys.value.pw.chk = true
  }
}

const verifyPwChk = async () => { // 비밀번호 체크 검사
  if (verifys.value.pwChk.value.length < 4) {
    verifys.value.pwChk.chk = false
    verifys.value.pw.text = '비밀번호는 4글자 이상이어야합니다.'
  } else if (verifys.value.pw.value !== verifys.value.pwChk.value) {
    verifys.value.pw.chk = false
    verifys.value.pwChk.chk = false
    verifys.value.pw.text = '비밀번호가 일치하지 않습니다.'
  } else if (verifys.value.pwChk.value === '') {
    verifys.value.pwChk.chk = false
    verifys.value.pw.text = '비밀번호를 입력해주세요.'
  } else {
    verifys.value.pw.chk = true
    verifys.value.pwChk.chk = true
  }
}

const verifyChk = async () => { // 유효성검사
  await verifyId()
  await verifyPw()
  await verifyName()
  await verifyPwChk()
}

const chkIdAvailable = async () => { // id 존재유무 검색
  await verifyId()
  if (verifys.value.id.chk === true) {
    const rs = await store.dispatch('auth/chkIdAvailable', verifys.value.id.value)
    if (rs === 'available') {
      verifys.value.id.text = '사용가능한 아이디입니다.'
      verifys.value.id.chk = true
      verifys.value.id.dbChk = true // passed
    } else if (rs === 'exist') {
      verifys.value.id.text = '이미 존재하는 아이디입니다.'
      verifys.value.id.chk = false
      verifys.value.id.dbChk = false // passed
    }
  }
}
</script>
<style lang="scss" scoped>
h1 {
  margin-top: 100px;
}
.regist-form{
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;

  .writing-form{
    width: 400px;
    height: 65px;
    margin: 0 auto;
    margin-bottom: 5px;

    .passed{
      color: rgb(36, 33, 236)
    }
    .error {
      color: rgb(223, 67, 67);
    }
    .passed, .error {
      margin-top: 2px;
      text-align: left;
    }

    input {
      height: 50px;
    }
  }
}
.btn-area{
  width: 100%;
  align-items: center;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  .regist-btn{
    width: 30rem;
    height: 4rem;
    font-size: 1.4rem;
    box-shadow: 0px 0px 5px #444;
    margin-bottom: 0.5rem;
  }

  img {
    max-width: 300px;
    display: inline-block;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
