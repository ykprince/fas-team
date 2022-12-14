<template>
    <div>
        <input
        v-model="query"
        type="text"
        placeholder="Search for book"/>
        <button
        class="btn btn-primary"
        @click="apply">
        Search
      </button>
      <div>
        {{books}}
      </div>
    </div>
  </template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState('book', [
      'meta',
      'books'
    ])
  },
  methods: {
    async apply () {
      console.log('aaaaaaaaaaaaaaaaaaaaaaa')
      this.$store.dispatch('book/searchBooks', {
        query: this.query
      })
    }
  },
  mounted () {
    // this.apply()
  }
}
</script>
