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
          <SBook  @sendData="readdt"
            v-for="book in books"
            :key="book.isbn"
            :book="book" />
        </div>
      </div>
      <div></div>
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
    readdt (data) {
      this.$emit('setData', data)
      console.log('ddemfdjdha', data)
    }
  }
}
</script>
