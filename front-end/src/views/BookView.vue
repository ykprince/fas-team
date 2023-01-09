<template>
  <div>
    <div class="container">
      <div  v-if="isShow"  >
        <addbook @handler="handler" class="container"></addbook>
      </div>
      <div class="view-ctrl">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" @click="setViewType('type-card')" checked>
          <label class="btn btn-outline-primary" for="btnradio1">카드</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" @click="setViewType('type-list')">
          <label class="btn btn-outline-primary" for="btnradio2">리스트</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" @click="setViewType('type-slide')">
          <label class="btn btn-outline-primary" for="btnradio3">개별</label>
        </div>
        <button
          class="btn btn-primary add-btn"
          @click="handler">
          독서 추가하기 +
        </button>
      </div>
      <BGList :viewType="viewType"></BGList>
    </div>
  </div>
</template>
<script>
import addbook from '@/components/book/AddBook.vue'
import BGList from '@/components/book/BookGetheringList.vue'
export default {
  data () {
    return {
      isShow: false,
      viewType: 'type-card'
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
    },
    setViewType (type) {
      this.viewType = type
    }
  }
}
</script>

<style lang="scss" scoped>
  .view-ctrl {
    width: 50%;
    text-align: right;
    .btn-group {
      margin-right: 10px;
    }
    .add-btn {

    }
  }
</style>
