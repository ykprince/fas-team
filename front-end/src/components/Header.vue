<template>
  <header>
    <Logo />
    <nav
      v-for="nav in navigations"
      :key="nav.name">
        <RouterLink
        :to="nav.href"
        >
        {{ nav.name }}
      </RouterLink>
    </nav>
    <div class="login-area">
      <RouterLink class="login-button" v-if="!authChk" to="/auth/login">Login</RouterLink>
      <button v-if="authChk" @click="logout">Logout</button>
      <img v-if="authChk" :src="auth.profileImage" alt="" class="profile-img" @click="myPage"> <!--프로필 이미지-->
    </div>
  </header>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
const navigations = ref([
  {
    name: 'Search',
    href: '/'
  },
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Habit',
    href: '/habit'
  },
  {
    name: 'Book',
    href: '/book'
  },
  {
    name: 'Rollingpaper',
    href: '/rollingpaper'
  }
])
const store = useStore()
const router = useRouter()
const auth = computed(() => store.state.auth.auth)
const authChk = ref(false)
watchEffect(() => {
  authChk.value = Object.keys(auth.value).length > 0
})
const logout = () => { store.dispatch('auth/logoutAuth') }
const myPage = () => { router.push({ name: 'mypage' }) }
</script>

<style scoped lang="scss">
header {
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 40px;
  position: relative;
}

nav {
  padding: 15px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.login-area {
  width: fit-content;
  position: absolute;
  right: 35px;

  button, .login-button {
    width: fit-content;
    height: 45px;
    padding: 15px;
    background: inherit;
    border: none;
    color: #2c3e50;
    text-decoration: none;

    &:hover {
      background: #e2e2e2;
    }
  }

  .profile-img{
    width: 30px;
    height: 30px;
    border-radius: 15px 15px 15px;
    margin-left: 5px;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>
