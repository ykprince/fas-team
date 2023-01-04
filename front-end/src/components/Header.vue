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
      <RouterLink v-if="auth" to="/auth/login">Login</RouterLink>
      <button v-if="!auth" @click="logout">Logout</button>
      <button v-if="!auth" >My Page</button>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      navigations: [
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
      ]
    }
  },
  computed: {
    ...mapState(['auth']),
    ...mapGetters(['getAuth'])
  },
  methods: {
  },
  created () {
    this.$store.dispatch('auth/getLoginSession')
  }
}
</script>

<style scoped>
header {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  position: relative;
}

nav {
  padding: 30px;
  flex: 1;
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
}
</style>
