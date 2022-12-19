<template>
  <div class="modal-p">
    <div class="overlay" @click="$emit('handler')"></div>
    <div class="modal-card" @click.stop="">

      <div v-if="curStep === 1" class="step-1">
        <div class="row">
              <input  v-model="query"  @keyup.enter="apply" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button @click="apply" class="btn btn-outline-success" type="submit">Search</button>
        </div>
        <div class="row">
          <div
            class="books">
            <SBList @setData="showData" />
          </div>
        </div>
      </div>

      <div v-else-if="curStep === 2" class="step-2" >
        <IGData :theBook="book" ></IGData>
      </div>

      <div v-else-if="curStep === 3" class="step-3" >
        <IGFrom :theBook="book"></IGFrom>
      </div>

      <div v-if="!(curStep === 1)" class="btn-field">
        <PCBtn :index="curStep > 1? curStep-1 : 1" :msg="msg1" @pageCtrl="pageCtrl"></PCBtn>
        <PCBtn :index="curStep + 1" :msg="msg2" @pageCtrl="pageCtrl"></PCBtn>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SBList from './SearchBookList.vue'
import IGData from './InputGetherData.vue'
import IGFrom from './InputGetherForm.vue'
import PCBtn from './PageCtrlBtn.vue'

export default {
  components: {
    SBList,
    IGFrom,
    IGData,
    PCBtn

  },
  data () {
    return {
      curStep: 1,
      msg1: 'Pre',
      msg2: 'Next',
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
      this.book = data
      this.curStep = 2
      console.log(this.step)
    },
    pageCtrl (num) {
      console.log(num, 'asdasdasd')
      this.curStep = num
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
  .step-1,
  .step-2,
  .step-3 {
    border: 2px solid red;
    height: 500px;
  }
  .step-1-1 {
      margin-top: 20px;
      height: 400px;
      border: 2px solid orange;
    }
</style>
