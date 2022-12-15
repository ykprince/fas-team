<template>
    <div
      @click="sendData"
      :style="{ backgroundImage: `url(${book.thumbnail})` }"
      class="book">
      <div class="info">
        <div class="year">
          {{ book.datetime }}
        </div>
        <div class="title">
          {{ book.title }}
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    sendData () {
      console.log(this.book)
      this.$emit('sendData', this.book)
      console.log(this.book)
    }
  }
}
</script>
