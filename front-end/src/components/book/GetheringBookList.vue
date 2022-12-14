<template>
    <div class="container">
      <div
        :class="{ 'no-result': !books.length }"
        class="inner">
        <div
          v-if="message"
          class="message">
          {{ message }}
        </div>
        <div
          v-else
          class="books">
          <!-- <BookGethering
            v-for="book in books"
            :key="book.isbn"
            :book="book" /> -->
        </div>
      </div>
    </div>
  </template>

<script>
import { mapState } from 'vuex'
// import BookGethering from './components/book/BookGethering.vue'

export default {
  components: {
    // BookGethering
  },
  computed: {
    ...mapState('book', [
      'books',
      'message'
    ])
  }
}
</script>
