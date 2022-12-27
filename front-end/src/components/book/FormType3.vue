<template>
  <div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">기대지수</label>
      <input type="range" class="form-range" id="customRange2" max="100" min="0" step="1" v-model="theGether.rateEx">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">기대평</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" max="100" min="0" step="1" v-model="theGether.expectComment"></textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
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
  }
}
</script>
