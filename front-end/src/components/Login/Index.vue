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
// const KakkaoLogin = async () => {
//   location.href = KAKAO_URI
//   // return new Promise((resolve, reject) => {
//   //   axios.post(url, null, {
//   //     params: {

//   //     }
//   //   })
//   //     .then((res) => {
//   //       if (res.data.Error) {
//   //         reject(res.data.Error)
//   //       }
//   //       console.log(res)
//   //       resolve(res)
//   //     })
//   //     .catch((err) => {
//   //       reject(err.message)
//   //     })
//   // })
// }

const kakaoLogin = async () => {
  await window.Kakao.init(KAKAO_JS_API_KEY)
  await store.dispatch('auth/kakaoAuthorize')
  // await window.Kakao.Auth.login({
  //   scope: 'profile_nickname, profile_image, account_email',
  //   success: getKakaoAccount
  // })
  // 인가 코드 받기 -> 토큰 받기 -> 사용자 정보 가져오기
  // redirectUri: '${SYSTEM_JSP_SITEURL}/login/snsKakaologin', redirect되는 URL
  // scope: 'phone_number'
}
// const getKakaoAccount = async () => {
//   await window.Kakao.API.request({ url: '/v2/user/me' })
//     .then((res) => {
//       const kakaoAccount = res.kakao_account
//       kakaoSuccessLogin(kakaoAccount)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

// const kakaoSuccessLogin = async (res) => {
//   const param = { ...res, type: 'kakao' }
//   await store.dispatch('auth/checkEmail', param)
// }

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
