<template>
  <div
    class="book-item-list">
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

.book-item-list {
  overflow: scroll;
  width: 100%;
}

.book-item-list>.item:last-child {
  margin-bottom: 80px;
}

</style>
