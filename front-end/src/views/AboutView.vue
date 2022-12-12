<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import http from '../http-common'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('about', [
      'name',
      'email',
      'blog',
      'phone',
      'image'
    ])
  },
  methods: {
    retrieveUsers () {
      http
        .get('/api/testH2')
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
