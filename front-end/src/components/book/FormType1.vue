<template>
  <div>
    <label for="inputPassword5" class="form-label">독서기간</label>
    <input class="form-control" type="date" placeholder="시작일" aria-label="default input example" v-model="theGether.sta_dt">
    <input class="form-control" type="date" placeholder="종료일" aria-label="default input example" v-model="theGether.end_dt">
    <label for="inputPassword5" class="form-label">평점</label>
    <input type="range" class="form-range" id="customRange1" max="100" min="0" step="1" v-model="theGether.rate">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  watch: {
    theGether (newVal) {
      console.log(newVal)
    }
  },
  computed: {
    ...mapState('bookGether', [
      'theGether',
      'books',
      'theBook'
    ])
  },
  mounted () {
    console.log('this.theGether')
    console.log(this.theGether)
  },
  methods: {
  }
}
</script>
