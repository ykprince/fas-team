<template>
  <div class="book-main-container">
    <div :class="viewType">
      <nav>
        <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
          <button class="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true" @click="testtt(0)">전체</button>
          <button class="nav-link" id="nav-type-1-tab" data-bs-toggle="tab" data-bs-target="#nav-type-1" type="button" role="tab" aria-controls="nav-type-1" aria-selected="false" @click="testtt(1)">읽은 책</button>
          <button class="nav-link" id="nav-type-2-tab" data-bs-toggle="tab" data-bs-target="#nav-type-2" type="button" role="tab" aria-controls="nav-type-2" aria-selected="false" @click="testtt(2)">읽고 있는 책</button>
          <button class="nav-link" id="nav-type-3-tab" data-bs-toggle="tab" data-bs-target="#nav-type-3" type="button" role="tab" aria-controls="nav-type-3" aria-selected="false" @click="testtt(3)">읽고 싶은 책</button>
        </div>
        <div class="etc-bar">
          <button type="button" id="delConfirmBtn" class="btn btn-light del-btn" @click="delGethers" style="display:none">정리 목록 전송</button>
          <button type="button" id="delSwitchBtn" class="btn btn-light" @click="modiGethers">정리하기</button>
        </div>
      </nav>
      <div class="infoArea">
        <div v-if="gethers.length === 0" class="gether">
          xx
        </div>
        <div v-else @click="test(gether)" v-for="gether in gethers" :key="gether.bgIdx" class="gether">
          <!-- new 버튼이 있을 시 position: absolute;  추가 -->
          <div  v-if="modiKey === 1" style="width:100%; text-align: right;z-index: 999;" @click="pushDelArr(gether.bgIdx)">
            <span class="badge bg-secondary" >X</span>
          </div>
          <BookGethering :gether="gether" :[attr]="vibration" >
          </BookGethering>
        </div>
      </div>
    </div>
    <div class="detailArea">
      <div v-if="bgId === 0">
        <img src="..\..\assets\book\bookMain.png" class="figure-img img-fluid book-main-img" alt="...">
      </div>
      <BGcontent v-else></BGcontent>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookGethering from './BookGethering.vue'
import BGcontent from '@/components/book/BookgetherContent.vue'

export default {
  components: {
    BookGethering,
    BGcontent
  },
  data () {
    return {
      tItem: 0,
      bgId: 0,
      modiKey: 0,
      attr: 'class',
      vibration: '',
      delArr: []
    }
  },
  props: {
    viewType: {
      Type: String,
      default: 'type-card'
    }
  },
  watch: {
    tItem (newVal) {
      this.$store.dispatch('bookGether/filterGethers', newVal)
      // this.$store.commit('bookGether/resetGethers', [])
      // this.$store.dispatch('bookGether/frontController', { uid: 0, type: newVal, processType: 'select', processName: 'Gether' }).then((data) => {
      //   console.log(data)
      // })
    },
    successTf (newVal) {
      if (newVal) {
        console.log('success')
        // this.$store.dispatch('bookGether/frontController', { uid: 0, type: 0, processType: 'select', processName: 'Gether' })
      } else {
        console.log('fail')
      }
    }
  },
  computed: {
    ...mapState('bookGether', [
      'theGether',
      'getherContent',
      'gethers',
      'message',
      'successTf'
    ])
  },
  methods: {
    testtt (num) {
      this.tItem = num
    },
    test (content) {
      if (this.modiKey === 0) {
        this.bgId = 1
        this.$store.commit('bookGether/setContent', content)
      } else if (this.modiKey === 1) {
        this.bgId = 0
        this.$store.commit('bookGether/setContent', {})
      }
    },
    modiGethers () {
      if (this.modiKey === 0) {
        this.modiKey = 1
        this.bgId = 0
        this.vibration = 'vibration'
        document.getElementById('delSwitchBtn').innerHTML = '취소하기'
        document.getElementById('delConfirmBtn').style.display = ''
      } else if (this.modiKey === 1) {
        this.modiKey = 0
        this.vibration = ''
        this.delArr = []
        document.getElementById('delSwitchBtn').innerHTML = '정리하기'
        document.getElementById('delConfirmBtn').style.display = 'none'

        document.querySelectorAll('.del-pushed').forEach(function (obj) {
          obj.classList.remove('del-pushed')
        })
      }
    },
    pushDelArr (idx) {
      const obj = document.getElementById(idx)

      if (obj.classList.contains('del-pushed')) {
        this.delArr = this.delArr.filter((g) =>
          g !== idx
        )
        obj.classList.remove('del-pushed')
      } else {
        obj.classList.add('del-pushed')
        this.delArr.push(idx)
      }
      console.log(this.delArr)
    },
    delGethers () {
      this.$store.dispatch('bookGether/frontController', { arr: this.delArr, processType: 'delete', processName: 'Gether' }).then(() => {
        this.$store.dispatch('bookGether/frontController', { uid: 0, type: 0, processType: 'select', processName: 'Gether' })
        this.modiGethers()
      })
    }
  },
  mounted () {
    this.$store.dispatch('bookGether/frontController', { uid: 0, type: 0, processType: 'select', processName: 'Gether' })
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Oswald);
@import url(https://fonts.googleapis.com/css?family=Quattrocento);
@import url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css);
.book-main-container{
  margin: 10px;
  height: 600px;
  display: flex;
}
.detailArea {
  height: 550px;
  width: 50%;
  margin: 15px;
  box-shadow: 5px 5px 5px 5px #e1e1e1;
}

.etc-bar {
  width: 100%;
  text-align: right;
  margin-right: 10px;
  margin-top: 10px;
}
// 최상위 div 클래스명 변경
// 1. 카드형 - type-card
// 2. 리스트형 - type-list
// 3. 개별형 - type-slide
.type-card {
  height: 550px;
  width: 50%;
  overflow: hidden;
  margin: 15px;
  box-shadow: 5px 5px 5px 5px #e1e1e1;
  padding: 5px;
  .infoArea {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 20px;
    overflow: scroll;
    // height: 500px;
    -ms-overflow-style: none;
  }
  .infoArea::-webkit-scrollbar{
    display:none;
  }
  .gether {
  font-family: 'Quattrocento', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 25px;
  color: #141414;
  text-align: left;
  line-height: 1.4em;
  font-size: 6px;
  width: 120px;
  height: 180px;
  }
  .gether * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
  }
  .vibration {
    animation: vibration .500s infinite;
    justify-content: center;
  }
  .thumbImg {
    width: 100%;
    height: 180px;
    max-width: 100%;
    vertical-align: top;
  }
  .gether figcaption {
    position: absolute;
    top: calc(75%);
    width: 100%;
    background-color: #ffffff;
    padding: 15px 25px 65px;
  }
  .gether figcaption:before {
    position: absolute;
    content: '';
    z-index: 1;
    bottom: 100%;
    left: 0;
    width: 100%;
    height: 80px;
    background-image: -webkit-linear-gradient(top, transparent 0%, #ffffff 100%);
    background-image: linear-gradient(to bottom, transparent 0%, #ffffff 100%);
  }
  .gether h3,
  .gether p {
    margin: 0 0 10px;
  }
  .gether h3 {
    font-weight: 300;
    font-size: 1.4em;
    line-height: 1.2em;
    font-family: 'Oswald', Arial, sans-serif;
    text-transform: uppercase;
  }
  .gether p {
    font-size: 0.9em;
    letter-spacing: 1px;
    opacity: 0.9;
  }
  .gether a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .gether:hover figcaption,
  .gether.hover figcaption {
    top: 80px;
  }

  .book-main-img {
    width: 100%;
    height: 100%;
  }
}

@keyframes vibration {
  from {
    transform: rotate(0.5deg);
  }
  to {
    transform: rotate(-0.5deg);
  }
}

.del-pushed {
  width: 100%;
  height: 100%;
  background-color: rgb(219, 98, 98);
  opacity: 0.7;
  position: absolute;
  z-index: 10;
}

.nav {

}
.del-btn {
  margin-right: 10px;
}
</style>
