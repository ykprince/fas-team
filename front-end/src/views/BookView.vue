<template>
  <button
        class="btn btn-primary"
        @click="handler">
        add
  </button>
  <div  v-if="isShow" >
    <addbook></addbook>
  </div>
  <!-- <BGList></BGList> -->
</template>
<script>
import addbook from '@/components/book/AddBook.vue'
// import BGList from '@/components/book/BookGetheringList.vue'
export default {
  data () {
    return {
      isShow: false
    }
  },
  components: {
    addbook
    // BGList
  },
  methods: {
    handler () {
      this.isShow = !this.isShow
      this.$store.commit('book/resetBooks')
    }
  }
}
</script>
