<template>
  <div class="modal-p">
    <div class="overlay" @click="$emit('handler')"></div>
    <div class="modal-card" @click.stop="">
      <div v-if="addStep === 1">
        <input
          v-model="query"
          type="text"
          placeholder="모임을 만들 책을 검색해주세요"
          class="bookSearch"
          @keyup.enter="apply"
        />
        <button
          class="btn btn-primary"
          @click="apply">
          검색
        </button>
        <div>
        <div
          class="books">
          <SBList @setData="showData" />
        </div>
      </div>
      </div>

      <div v-else-if="addStep === 2" class="getherForm" >
        <!-- <IGInfo :theBook="book" ></IGInfo> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SBList from './SearchBookList.vue'
// import IGInfo from './InputGetherInfo.vue';

export default {
  components: {
    SBList
    // IGInfo
  },
  data () {
    return {
      addStep: 1,
      query: '',
      book: {}
    }
  },
  computed: {
    ...mapState('book', [
      'meta',
      'books'
    ])
  },
  methods: {
    async apply () {
      this.$store.dispatch('book/searchBooks', {
        query: this.query
      })
    },
    showData (data) {
      console.log(':::::::::::::::::::::::::::::::::::::::::::')
      this.book = data
      this.addStep = 2
      console.log(this.step)
    }
  },
  mounted () {
    // this.apply()
  }
}
</script>

<style lang="scss" scoped>
/* Modal */
.modal-p,
.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.overlay {
  opacity: 0.5;
  background-color: black;
}
.modal-card {
  position: relative;
  max-width: 80%;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
}
  .bookSearch {
    width: 30%;
    height: 30px;
    border-radius: 5px;
    padding-right: 10px;
  }
</style>
