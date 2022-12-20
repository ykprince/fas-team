<template>
  <div>
    <label for="inputPassword5" class="form-label">독서량</label>
    <input class="form-control" type="text" placeholder="읽은 페이지 수" aria-label="default input example" v-model="theGether.readPage">
    <label for="inputPassword5" class="form-label">독서 기간</label>
    <input class="form-control" type="text" placeholder="시작일" aria-label="default input example" v-model="theGether.staDt">
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
