<template>
  <!-- <img :src="book.thumbnail" class="rounded float-start bookImg" alt="asd"  @click="sendData"/> -->
  <div class="card mb-3"  @click="sendData">
    <div class="row g-0">
      <div class="col-md-4">
        <img  :src="book.thumbnail" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{book.title}}</h5>
          <p class="card-text"><small class="text-muted">{{book.authors}}</small></p>
          <p class="card-text">{{book.contents.substring(0, 100) + '...'}}</p>
        </div>
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
    async sendData () {
      console.log('asdad@@@@@@@@@@@@@@@@@@@@@@@ADDadasds')
      this.$store.commit('book/updateState', {
        theBook: this.book,
        curStep: 2,
        loading: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
 border-radius: 5px;
 align-items:center;
}
.card-title{
  font-size: 15px;
  color: $black;
  margin: 5px;
}
</style>
