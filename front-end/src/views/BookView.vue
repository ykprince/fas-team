<template>
  <div class="container">
    <button
          class="btn btn-primary"
          @click="handler">
          add
    </button>
    <select>
      <option>카드형</option>
      <option>리스트형</option>
      <option>개별</option>
    </select>
    <div  v-if="isShow"  >
      <addbook @handler="handler" class="container"></addbook>
    </div>
    <BGList></BGList>
  </div>
</template>
<script>
import addbook from '@/components/book/AddBook.vue'
import BGList from '@/components/book/BookGetheringList.vue'
export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    addbook,
    BGList
  },
  methods: {
    handler () {
      this.isShow = !this.isShow
      this.$store.commit('book/resetBooks')
    }
  }
}
</script>
