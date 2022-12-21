<template>
  <div class="book-main-container type-card">
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button class="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true" @click="testtt(0)">전체</button>
        <button class="nav-link" id="nav-type-1-tab" data-bs-toggle="tab" data-bs-target="#nav-type-1" type="button" role="tab" aria-controls="nav-type-1" aria-selected="false" @click="testtt(1)">읽은 책</button>
        <button class="nav-link" id="nav-type-2-tab" data-bs-toggle="tab" data-bs-target="#nav-type-2" type="button" role="tab" aria-controls="nav-type-2" aria-selected="false" @click="testtt(2)">읽고 있는 책</button>
        <button class="nav-link" id="nav-type-3-tab" data-bs-toggle="tab" data-bs-target="#nav-type-3" type="button" role="tab" aria-controls="nav-type-3" aria-selected="false" @click="testtt(3)">읽고 싶은 책</button>
      </div>
    </nav>
    <div class="infoArea">
      <div v-for="gether in gethers2" :key="gether.type" class="gether">
        <BookGethering :gether="gether"></BookGethering>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookGethering from './BookGethering.vue'

export default {
  components: {
    BookGethering
  },
  data () {
    return {
      tItem: 0
    }
  },
  watch: {
    tItem (newVal) {
      if (newVal === 1) {
        this.getItem[0].a = 10
      } else if (newVal === 2) {
        this.getItem[0].a = 20
      } else {
        this.getItem[0].a = 30
      }
    }
  },
  computed: {
    ...mapState('bookGether', [
      'gethers2',
      'message'
    ])
  },
  methods: {
    testtt (num) {
      this.tItem = num
    }
  }
}
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Oswald);
@import url(https://fonts.googleapis.com/css?family=Quattrocento);
.book-main-container{
  margin: 10px;
  height: 500px;
  border: 1px solid gray;
  background-color: rgb(252, 252, 252);
}

// 최상위 div 클래스명 변경
// 1. 카드형 - type-card
// 2. 리스트형 - type-list
// 3. 개별형 - type-slide
.type-card {
  .infoArea {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 20px;
    overflow: scroll;
    height: 500px;
    -ms-overflow-style: none;
  }
  .infoArea::-webkit-scrollbar{
    display:none;
  }

  .gether {
  font-family: 'Quattrocento', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 10px;
  color: #141414;
  text-align: left;
  line-height: 1.4em;
  font-size: 16px;
  // border: 1px solid black;
  width: 180px;
  height: 240px;
  // border-radius: 8px;
  // box-shadow: 1px 1px 1px 1px gray;
  }
  .gether * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
  }
  .thumbImg {
    width: 100%;
    height: 180px;
    max-width: 100%;
    vertical-align: top;
  }
  .gether figcaption {
    position: absolute;
    top: calc(80%);
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
}
</style>
