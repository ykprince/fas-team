<template lang="">
  <div class="container">
    <div>
      <h1>로그인해주세요</h1>
    </div>
    <div class="form-floating mb-3"><!--아이디-->
      <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="vertify.id">
      <label for="floatingInput">아이디를 입력해주세요</label>
    </div>
    <div class="form-floating mb-3"><!--비밀번호-->
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="vertify.pw">
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check auto-login-check"> <!--자동로그인-->
      <input class="form-check-input" type="checkbox" v-model="autoLoginChk" id="autoLogin" >
      <label class="form-check-label" for="autoLogin">자동 로그인</label>
    </div>

    <div class="btn-area">
      <button class="btn btn-light login-btn" type="button" @click="loginChk" >로그인할게요</button>
      <img :src="KAKKAO_BTN" alt="카카오톡 로그인버튼"  @click="kakaoLogin" class="kakao-login-img">
      <div>
        <button @click="GoogleLogin">google</button>
      </div>

      <div><!-- 회원가입 -->
        <p class="regist-link" @click="route.push('/auth/regist')">회원가입하러 가기</p>
      </div>
    </div>
    <spinner-vue v-if="loading"></spinner-vue>

  </div>
</template>
<script setup>
import SpinnerVue from '../habit/Spinner.vue'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
const route = useRouter()
const store = useStore()
const auth = computed(() => store.state.auth.auth)
const autoLoginChk = ref(false)

const loading = computed(() => store.state.loading)

watch(() => auth.value, (newValue, oldValue) => {
  if (auth.value.uid) {
    console.log('로그인 성공!')
    route.push('/')
  }
})
const KAKKAO_BTN = require('@/assets/kakao_login_large_wide.png')
const vertify = ref({
  id: '',
  pw: '',
  autoLoginChk: false
})
const vertifyChk = ref({
  id: true,
  pw: true
})

const loginChk = async () => {
  fncVertifyChk()

  if (vertifyChk.value.id === true && vertifyChk.value.pw === true) {
    vertify.value.autoLoginChk = autoLoginChk.value === true
    // 로그인 체크 - store
    const resString = await store.dispatch('auth/loginCheckById', vertify.value)
    if (resString === 'no-id') { // id 없을 경우
      alert('해당 아이디가 존재하지 않습니다.')
    } else if (resString === 'no-pw') {
      alert('비밀번호가 틀렸습니다.')
    }
  }
}

const fncVertifyChk = () => {
  vertify.value.id === '' ? vertifyChk.value.id = false : vertifyChk.value.id = true
  vertify.value.pw === '' ? vertifyChk.value.pw = false : vertifyChk.value.pw = true

  vertify.value.id.length < 4 ? vertifyChk.value.id = false : vertifyChk.value.id = true // ID는 최소 4글자
  vertify.value.pw.length < 4 ? vertifyChk.value.pw = false : vertifyChk.value.pw = true // PW는 최소 4글자
}

const getLocalId = () => { // 자동로그인설정
  if (localStorage.getItem('fasolVueAppLoginId')) {
    vertify.value.id = localStorage.getItem('fasolVueAppLoginId')
    vertify.value.pw = localStorage.getItem('fasolVueAppLoginPw')
    autoLoginChk.value = true
    loginChk()
  }
}
getLocalId()

const kakaoLogin = async () => {
  await store.dispatch('auth/kakaoAuthorize')
}

// const kakaoLogout = () => {
//   window.Kakao.Auth.logout((res) => {
//     console.log(res)
//   })
// }

const GoogleLogin = () => {
  console.log('GoogleLogin')
}
</script>
  <style lang="scss" scoped>
  .container {
    width: 100%;
    max-width: 500px;

    .auto-login-check {
      text-align: left;
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
