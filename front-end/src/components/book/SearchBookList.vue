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
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  border: 3px solid black;
}

.books {
  border: 3px solid blue;
  display: flex;
  flex-wrap: wrap;
}
</style>
