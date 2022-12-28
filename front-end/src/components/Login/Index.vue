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
      <img :src="KAKKAO_BTN" alt="카카오톡 로그인버튼"  @click="KakkaoLogin" >
      <div>

        <button @click="GoogleLogin">google</button>
      </div>

    </div>
  </div>
</template>
<script setup>
import { KAKAO_URI } from '@/store/kakkaoShareLink.js'
import { ref } from 'vue'
// import axios from 'axios'
const KAKKAO_BTN = require('@/assets/kakao_login_large_wide.png')
// window.Kakao.init(KAKAO_JS_API_KEY)

const vertify = ref({
  id: '',
  pw: ''
})
const KakkaoLogin = async () => {
  location.href = KAKAO_URI
  // return new Promise((resolve, reject) => {
  //   axios.post(url, null, {
  //     params: {

  //     }
  //   })
  //     .then((res) => {
  //       if (res.data.Error) {
  //         reject(res.data.Error)
  //       }
  //       console.log(res)
  //       resolve(res)
  //     })
  //     .catch((err) => {
  //       reject(err.message)
  //     })
  // })
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
