<template>
    <div></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
  },
  props: {
    theBook: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState('book', [
      'meta',
      'books'
    ])
  },
  methods: {
    pageCtrl2 () {
      console.log(this.theBook)
    }
  },
  mounted () {
    this.pageCtrl2()
  }
}
</script>
