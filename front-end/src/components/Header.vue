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
  </header>
</template>

<script>
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
        }
      ]
    }
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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
