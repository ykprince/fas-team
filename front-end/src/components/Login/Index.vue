<template lang="">
  <div class="container">
    <div>
      <h1>로그인해주세요</h1>
    </div>
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="vertify.id">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="vertify.pw">
      <label for="floatingPassword">Password</label>
    </div>
    <div class="btn-area">
      <img :src="KAKKAO_BTN" alt="카카오톡 로그인버튼"  @click="kakaoLogin" >
      <div>
        <button @click="GoogleLogin">google</button>
      </div>
    </div>
    <button @click="kakaoLogout">로그아웃</button>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { KAKAO_JS_API_KEY } from '@/store/kakkaoShareLink.js'
import { ref } from 'vue'

const store = useStore()
const KAKKAO_BTN = require('@/assets/kakao_login_large_wide.png')
const vertify = ref({
  id: '',
  pw: ''
})

const kakaoLogin = async () => {
  await window.Kakao.init(KAKAO_JS_API_KEY)
  await store.dispatch('auth/kakaoAuthorize')
}

const kakaoLogout = () => {
  window.Kakao.Auth.logout((res) => {
    console.log(res)
  })
}

const GoogleLogin = () => {
  console.log('GoogleLogin')
}
</script>
<style lang="scss" scoped>
.container {
width: 100%;
max-width: 500px;

.btn-area{
  width: 100%;
  max-width: 300px;
  padding:0 auto;
  margin:0 auto;
  align-items: center;

  img {
    margin:0 auto;
    width: 100%;
  }
}
}
</style>
