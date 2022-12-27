<template>
  <div>
    <div class="input-form">
    <h4>독서기간</h4>
      <div class="form-items">
        <div>
          <label for="staDt1" class="form-label">독서량</label>
          <input class="form-control" type="date" id="staDt1" placeholder="시작일" v-model="theGether.staDt">
          <span>~</span>
        </div>
        <div>
          <label for="endDt1" class="form-label">독서량</label>
          <input class="form-control" type="date" id="endDt1" placeholder="종료일" v-model="theGether.endDt">
        </div>
      </div>
    </div>
    <div class="input-form">
      <H4>평점</H4>
      <div class="form-item">
        <input type="range" class="form-range" id="customRange1" max="100" min="0" step="1" v-model="theGether.rate">
        <input type="number" class="form-control border-secondary rounded-pill" max="100" min="0" step="1" v-model="theGether.rate">
      </div>
    </div>
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
      'theGether'
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

<style lang="scss" scoped>

.input-form {
  padding: 30px;
}
.form-items {
  margin-top: 30px;
  display: flex;
  div: {
    text-align: left;
    width: 200px;
    margin: 20px;
  }
  span {
    width: 30px;
  }
}
.number-title {
  display: flex;

  H6 {

  }
  input {
  }
}
</style>
