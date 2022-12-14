<template>
    <div class="about">
      <h1>This is an about page</h1>
      {{this.books}}
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
    ]),
    ...mapState('book', [
      'meta',
      'books'
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
    },
    retrieveUsers3 () {
    },
    async apply () {
      console.log('aaaaaaaaaaaaaaaaaaaaaaa')
      this.$store.dispatch('book/searchBooks', {
        query: 'jungle'
      })

      console.log(this.books)
    }
  },
  mounted () {
    this.retrieveUsers()
    this.apply()
  }
}
</script>
