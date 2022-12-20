<template>

  <div class="modal-p">
    <div class="overlay" @click="$emit('handler')"></div>
    <div class="modal-card" @click.stop="">

      <div v-if="curStep === 1" class="step-1">
        <div class="row addStepArea">
          <div class="input-group">
            <input type="text" v-model="query"  @keyup.enter="apply" class="form-control" placeholder="책 이름을 검색" aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" @click="apply" type="button" id="button-addon2">검색</button>
          </div>
        </div>
        <div class="row contentsArea-1">
          <div  v-if="books.length > 0">
            <SBList @setData="showData" />
          </div>
        </div>
      </div>

      <div v-else-if="curStep === 2" class="step-2" >
        <!-- <div class="addStepArea">
        </div> -->
        <div class="row contentsArea">
          <IGData :theBook="theBook" ></IGData>
        </div>
      </div>

      <div v-else-if="curStep === 3" class="step-3" >
        <div class="row addStepArea">
        </div>
        <div class="row contentsArea">
          <IGFrom :theBook="theBook"></IGFrom>
        </div>
      </div>
      <div class="btn-field">
        <div v-if="!(curStep === 1)">
          <PCBtn :index="curStep > 1? curStep-1 : 1" :msg="msg1" @pageCtrl="pageCtrl"></PCBtn>
          <PCBtn v-if="!(curStep === 3)" :index="curStep + 1" :msg="msg2" @pageCtrl="pageCtrl"></PCBtn>
          <button v-else @click="addBookGethering">저장</button>
        </div>
        <div v-else>
          <button @click="$emit('handler')">닫기</button>
        </div>
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
      // curStep: 1,
      msg1: 'Pre',
      msg2: 'Next',
      query: '',
      book: {}
    }
  },
  computed: {
    ...mapState('book', [
      'meta',
      'books',
      'theBook',
      'curStep'
    ])
    // ...mapState('bookGether', [
    //   'theGether',
    //   'books',
    //   'theBook'
    // ])
  },
  watch: {
    theBook (newVal) {
      this.theBook = newVal
      this.curStep = 2
    }
  },
  methods: {
    async apply () {
      this.$store.dispatch('book/searchBooks', {
        query: this.query
      })
    },
    pageCtrl (num) {
      console.log('"들어옴>"')
      // this.curStep = num
      this.$store.commit('book/updateState', {
        curStep: num
      })
    },
    addBookGethering () {
      this.$store.dispatch('bookGether/testConsole')
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
  text-align: center;
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
  border-radius: 10px;
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
    height: 500px;
  }
 .contentsArea-1 {
  text-align: left;
  overflow: auto;
  height: 90%;
  margin-top: 10px;
 }
 .contentsArea {
  text-align: left;
  overflow: auto;
  height: 100%;
  margin-top: 10px;
 }
</style>
