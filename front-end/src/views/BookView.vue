<template>
  <div>
    <div class="container">
      <div  v-if="isShow"  >
        <addbook @handler="handler" class="container"></addbook>
      </div>
      <BGList></BGList>
    </div>
    <button
      class="btn btn-primary add-btn"
      @click="handler">
      독서 추가하기
    </button>
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

<style lang="scss" scoped>
  .add-btn {
    position: fixed;
    top: 6%;
    right: 10%;
    border-radius: 60px;
    width: 100px;
    height: 100px;
  }
</style>
