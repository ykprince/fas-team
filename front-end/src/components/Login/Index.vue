<template lang="">
  <div class="container">
    <div>
      <h1>로그인해주세요</h1>
    </div>
    <form @submit.prevent="loginChk">
      <div class="form-floating mb-3"><!--아이디-->
        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="vertify.id" autocomplete="true">
        <label for="floatingInput">아이디를 입력해주세요</label>
        <p class="error" v-if="!vertifyChk.id.chk">{{vertifyChk.id.text}}</p>
      </div>
      <div class="form-floating mb-3"><!--비밀번호-->
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="vertify.pw" autocomplete="true">
        <label for="floatingPassword">Password</label>
        <p class="error" v-if="!vertifyChk.pw.chk">{{vertifyChk.pw.text}}</p>
      </div>

      <div class="form-check auto-login-check"> <!--자동로그인-->
        <input class="form-check-input" type="checkbox" v-model="autoLoginChk" id="autoLogin">
        <label class="form-check-label" for="autoLogin">자동 로그인</label>
      </div>

      <div class="btn-area">
        <button class="btn btn-light login-btn" type="submit" >로그인할게요</button>
        <img :src="KAKKAO_BTN" alt="카카오톡 로그인버튼"  @click="kakaoLogin" class="kakao-login-img">
        <div>
          <button @click="GoogleLogin">google</button>
        </div>

        <div><!-- 회원가입 -->
          <p class="regist-link" @click="route.push('/auth/regist')">회원가입하러 가기</p>
        </div>
      </div>
    </form>
    <spinner-vue v-if="loading"></spinner-vue>
  </div>
</template>
<script setup>
import SpinnerVue from '../habit/Spinner.vue'
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const store = useStore()
const autoLoginChk = ref(false)
const auth = computed(() => store.state.auth.auth) // 계정
const loading = ref(false) // 로딩바 설정
const KAKKAO_BTN = require('@/assets/kakao_login_large_wide.png') // 버튼 이미지
const vertify = ref({
  id: '',
  pw: '',
  autoLoginChk: false
}) // 로그인입력값
const vertifyChk = ref({
  id: {
    chk: true,
    text: '아이디를 확인해주세요.'
  },
  pw: {
    chk: true,
    text: '비밀번호를 확인해주세요'
  }
}) // 입력값 유효성 체크용

const fncFailedVerify = (resString = String) => { // 유효성 검사 실패 로직 처리
  if (!resString) { // keyup 인경우
    if (vertify.value.id === '') {
      vertifyChk.value.id.chk = false
      vertifyChk.value.id.text = '아이디를 입력해주세요'
    }
    if (vertify.value.id.length < 4 && vertify.value.id !== '') {
      vertifyChk.value.id.chk = false
      vertifyChk.value.id.text = '아이디는 4글자 이상이어야합니다.'
    }
    if (vertify.value.pw === '') {
      vertifyChk.value.pw.chk = false
      vertifyChk.value.pw.text = '비밀번호를 입력해주세요'
    }
    if (vertify.value.pw.length < 4 && vertify.value.pw !== '') {
      vertifyChk.value.pw.chk = false
      vertifyChk.value.pw.text = '비밀번호는 4글자 이상이어야합니다.'
    }
  } else { // loginchk의 경우
    if (resString === 'no-id') {
      vertifyChk.value.id.chk = false
      vertifyChk.value.id.text = '아이디가 존재하지 않습니다.'
    } else if (resString === 'no-pw') {
      vertifyChk.value.pw.chk = false
      vertifyChk.value.pw.text = '비밀번호가 틀렸습니다.'
    }
  }
  loading.value = false
}

const loginChk = async () => {
  loading.value = true
  fncVertifyChk()

  if (vertifyChk.value.id.chk === true && vertifyChk.value.pw.chk === true) {
    vertify.value.autoLoginChk = autoLoginChk.value === true

    const resString = await store.dispatch('auth/loginCheckById', vertify.value)// 로그인 체크 - store

    if (resString === 'success-login') {
      if (auth.value !== {} && auth.value) {
        loading.value = false
        route.push('/')
      }
    } else {
      fncFailedVerify(resString) // 유효성 검사 실패 로직
    }
  } else {
    fncFailedVerify()
  }
}

const fncVertifyChk = () => { // 로그인 입력값 유효성 확인
  vertify.value.id === '' ? vertifyChk.value.id.chk = false : vertifyChk.value.id.chk = true
  vertify.value.pw === '' ? vertifyChk.value.pw.chk = false : vertifyChk.value.pw.chk = true

  vertify.value.id.length < 4 ? vertifyChk.value.id.chk = false : vertifyChk.value.id.chk = true // ID는 최소 4글자
  vertify.value.pw.length < 4 ? vertifyChk.value.pw.chk = false : vertifyChk.value.pw.chk = true // PW는 최소 4글자
}

const getLogoutCheck = computed(() => store.getters.getLogoutCheck)

if (localStorage.getItem('fasolLocalAutoLoginInfo')) {
  let loginInfo = localStorage.getItem('fasolLocalAutoLoginInfo')
  loginInfo = JSON.parse(loginInfo)

  vertify.value.id = loginInfo.id
  vertify.value.pw = loginInfo.pw
  // 세팅완료

  // 1)로그아웃일 경우 아이디/비밀번호 세팅까지만.
  // 2)일반 로그인의 경우(자동로그인)
  if (getLogoutCheck.value === false) {
    autoLoginChk.value = true
    loginChk() // 로그인처리
  }
}
const kakaoLogin = async () => {
  await store.dispatch('auth/kakaoAuthorize')
}

const GoogleLogin = () => {
  console.log('GoogleLogin')
}
</script>
  <style lang="scss" scoped>
  .container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;

    .auto-login-check {
      text-align: left;
    }

    .error {
      margin-left: 3px;
      margin-top: 2px;
      text-align: left;
      color: rgb(255, 61, 61);
    }

    .btn-area{
      width: 100%;
      max-width: 300px;
      padding: 0 auto;
      margin: 3rem auto;
      align-items: center;

      .login-btn{
        width: 30rem;
        height: 4.5rem;
        font-size: 1.4rem;
        box-shadow: 0px 0px 5px #444;
        margin-bottom: 0.5rem;
      }

      img {
        margin:0 auto;
        width: 100%;
        box-shadow: 1px 1px 1px grey;
        border-radius: 5px 5px 5px;

        &:hover {
          cursor: pointer;
        }
      }
      .regist-link{
        font-size: 1.2rem;
        color: black;
        text-decoration: none;

        &:hover {
          cursor: pointer;
          text-decoration: underline #444;
        }
      }
    }
  }
</style>
