<template>
  <div
    v-if="message"
    class="message">
    {{ message }}
  </div>
  <div
    v-else
    class="books2">
    <SBook
      v-for="book in books"
      :key="book.isbn"
      :book="book" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SBook from './SearchBook.vue'

export default {
  components: {
    SBook
  },
  computed: {
    ...mapState('book', [
      'books',
      'message'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
