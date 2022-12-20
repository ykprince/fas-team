<template>
    <div class="container">

      <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true" @click="testtt(0)">전체</button>
    <button class="nav-link" id="nav-type-1-tab" data-bs-toggle="tab" data-bs-target="#nav-type-1" type="button" role="tab" aria-controls="nav-type-1" aria-selected="false" @click="testtt(1)">읽은 책</button>
    <button class="nav-link" id="nav-type-2-tab" data-bs-toggle="tab" data-bs-target="#nav-type-2" type="button" role="tab" aria-controls="nav-type-2" aria-selected="false" @click="testtt(2)">읽고 있는 책</button>
    <button class="nav-link" id="nav-type-3-tab" data-bs-toggle="tab" data-bs-target="#nav-type-3" type="button" role="tab" aria-controls="nav-type-3" aria-selected="false" @click="testtt(3)">읽고 싶은 책</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <!-- <div class="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabindex="0">11111111111</div>
  <div class="tab-pane fade" id="nav-type-1" role="tabpanel" aria-labelledby="nav-type-1-tab" tabindex="1">22222222222</div>
  <div class="tab-pane fade" id="nav-type-2" role="tabpanel" aria-labelledby="nav-type-2-tab" tabindex="2">333333333333</div>
  <div class="tab-pane fade" id="nav-type-3" role="tabpanel" aria-labelledby="nav-type-3-tab" tabindex="3">44444444444</div> -->
  <div class="contentsArea" v-if="tItem === 0">aaaaaaaaaaaaaaa</div>
  <div class="contentsArea" v-else-if="tItem === 1">bbbbbbbbbbbbbbb</div>
  <div class="contentsArea" v-else-if="tItem === 2">ccccccccccccccccccc</div>
  <div class="contentsArea" v-else>dddddddddddddddddd</div>
</div>
    </div>
  </template>

<script>
import { mapState } from 'vuex'
// import BookGethering from './BookGethering.vue'

export default {
  components: {
    // BookGethering
  },
  data () {
    return {
      tItem: 0
    }
  },
  computed: {
    ...mapState('book', [
      'books',
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

<style scoped>
.contentsArea {
  height: 90%;
}
</style>
