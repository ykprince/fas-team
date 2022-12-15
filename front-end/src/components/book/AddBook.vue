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
        <div
          class="books">
          <SBList @setData="showData" />
        </div>
      </div>
      <div class="getherForm">
        {{book}}
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import SBList from './SearchBookList.vue'

export default {
  components: {
    SBList
  },
  data () {
    return {
      query: '',
      book: {}
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
    },
    showData (data) {
      this.book = data
      console.log('ehckr::::', this.book)
    }
  },
  mounted () {
    // this.apply()
  }
}
</script>
