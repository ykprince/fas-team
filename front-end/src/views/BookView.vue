<template>
  <addbook></addbook>
  <BGList></BGList>
</template>
<script>
import addbook from '@/components/book/AddBook.vue'
// import BGList from '@/components/book/BookGetheringList.vue'
import BGList from '@/components/book/GetheringBookList.vue'
export default {
  components: {
    addbook,
    BGList
  }
}
</script>
