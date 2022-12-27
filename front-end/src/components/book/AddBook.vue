<template>

  <div class="modal-p">
    <div class="overlay" @click="$emit('handler')"></div>
    <div class="modal-card" @click.stop="">

      <div v-if="curStep === 1" class="step-1">
        <div class="row addStepArea">
          <div class="input-group">
            <input type="text" v-model="query"  @keyup.enter="apply" class="form-control search-bar" placeholder="책 이름을 검색">
            <button class="btn btn-outline-secondary search-btn" @click="apply" type="button" id="button-addon2">검색</button>
          </div>
        </div>
        <div class="row contentsArea-1">
          <SBList v-if="books.length > 0" @setData="showData"  class="book-list" />
            <div class="no-data" v-else>
              <figure class="figure">
              <img src="..\..\assets\book\no-data.png" class="figure-img img-fluid no-data-img" alt="...">
                <figcaption class="figure-caption">처음 진입 했을 때에 출력할 이미지 (임시)</figcaption>
              </figure>
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
          <PCBtn class="btn btn-secondary pgCtrlBtn" :index="curStep > 1? curStep-1 : 1" :msg="msg1" @pageCtrl="pageCtrl"></PCBtn>
          <PCBtn class="btn btn-secondary pgCtrlBtn" v-if="!(curStep === 3)" :index="curStep + 1" :msg="msg2" @pageCtrl="pageCtrl"></PCBtn>
          <button class="saveBtn" v-else @click="addBookGethering">저장</button>
        </div>
        <div v-else>
          <button class="btn btn-secondary saveBtn" @click="$emit('handler')">닫기</button>
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
      errorBag: { name: [] },
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
      // this.curStep = num
      this.$store.commit('book/updateState', {
        curStep: num
      })
    },
    async addBookGethering () {
      this.$store.dispatch('bookGether/insertBookGether', this.theBook).then(() => {
        alert('(토스트로 바꾸기)')
        this.$store.commit('bookGether/resetTheGether', '')
        this.$emit('handler')
      })

      // const res = await this.$store.dispatch('bookGether/insertBookGether', this.theBook)
      // if (res.sucTf) {
      //   console.log('callback')
      //   alert(res.msg + '(토스트로 바꾸기)')
      //   this.$emit('handler')
      // }
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
  z-index: 5;
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
  padding: 40px 80px 40px 80px;
  background-color: white;
  border-radius: 10px;
  min-height: 500px;
  z-index: 10;
  opacity: 1;
  .search-bar {
    min-height: 50px;
    border-radius: 5px;
  }
  .search-btn{
    min-width: 80px;
  }
  .no-data{
    text-align: center;
    .no-data-img{
      height: 400px;
    }
  }
}

.step-1,
.step-2,
.step-3 {
  height: 500px;
}

.contentsArea-1 {
  height: 90%;
  text-align: left;
  margin-top: 15px;
}
.book-list {
  display: inline-block;
  height: 400px;
  -ms-overflow-style: none;
}

.book-list::-webkit-scrollbar{
  display:none;
}

.contentsArea {
  text-align: left;
  overflow: auto;
  height: 100%;
  margin-top: 10px;
}

.pgCtrlBtn {
  width: 100px;
  height: 30px;
  margin: 6px;
}
.saveBtn {
  width: 100px;
  height: 30px;
  margin: 6px;
}
</style>
