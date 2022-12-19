<template>
  <Header></Header>
  <router-view/>
  <Footer></Footer>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  components: {
    Header,
    Footer
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

  textarea:focus {outline: none;}
  button:focus {outline: none;}
  input:focus {outline: none;}
}

</style>
