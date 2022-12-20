<template lang="">
  <div class="container" :style="{'background-color': rollingpaperObj.paperStyle}">
    <div class="container-header">
      <h3>{{rollingpaperObj.paperName}}&nbsp;</h3>
      <span>에는 총</span>
        <h3>&nbsp;{{rollingpaperObj.paperList.length}}&nbsp;</h3>
        <span>개의 쪽지가 있어요.</span>
    </div>

    <div class="container-content-area">
      <div class="content" v-for="(item, index) in rollingpaperObj.paperList" :key="index">
        {{item.title}}
      </div>
    </div>

  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { defineProps, computed } from 'vue'
const props = defineProps({
  id: {
    Type: Number,
    default: 0
  }
})

const store = useStore()
const rollingpaperList = computed(() => store.state.rollingPaper.all)
store.dispatch('getAllPapers')

const rollingpaperObj = computed(() => store.state.rollingPaper.one)
store.dispatch('getOnePaper', props.id)

console.log(rollingpaperList)
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  color: white;
  border-radius: 0.5rem;

  .container-header {
    width: 100%;
    padding: 0 auto;
    h3 {
      display: inline-block;
    }

  }

}
</style>
