<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import http from '../http-common'

export default {
  methods: {
    retrieveUsers () {
      http
        .get('/api/hello')
        .then(response => {
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.retrieveUsers()
  }
}
</script>
