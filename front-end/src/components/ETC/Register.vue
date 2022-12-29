<template lang="">
  <div>
    <h1>회원가입하기</h1>
    <transition>
      <div>
        <button @click="registerChk">카카오로 회원가입하기</button>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const registerChk = async () => {
  // 로딩바 추가
  store.dispatch('auth/registWithKakao')
}

</script>
<style lang="">

</style>
