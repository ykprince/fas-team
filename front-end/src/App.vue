<template>
  <Header></Header>
  <router-view/>
  <show-new-list ></show-new-list>
  <Footer></Footer>
</template>

<script>
import ShowNewList from './components/ShowNewList.vue'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  components: {
    Header,
    Footer,
    ShowNewList
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
